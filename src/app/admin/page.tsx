"use client";

import { useState, useEffect } from 'react';
import { collection, doc, setDoc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../../firebase/clientApp';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [summary, setSummary] = useState('');
  const [technical, setTechnical] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isEnglish, setIsEnglish] = useState(false);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [encodedImages, setEncodedImages] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'add' | 'edit'>('add');
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [categoryProducts, setCategoryProducts] = useState<string[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [adminMode, setAdminMode] = useState<'select' | 'edit' | 'add'>('select');

  const categories = {
    tr: [
      'RADYAFARMASÖTİK ÜRETİM TESİSLERİ',
      'NÜKLEER TIP',
      'RADYOLOJİ',
      'RADYOTERAPİ',
      'NDT',
      'NÜKLEER VE ARAŞTIRMA TESİSLERİ',
      'İNŞAAT',
      'DENİZCİLİK',
      'METAL VE MADEN',
      'AR-GE'
    ],
    en: [
      'PHARMACEUTICAL PRODUCTION FACILITIES',
      'NUCLEAR MEDICINE',
      'RADIOLOGY',
      'RADIOTHERAPY',
      'NON-DESTRUCTIVE TESTING',
      'NUCLEAR RESEARCH FACILITIES',
      'CONSTRUCTION',
      'MARINE',
      'METAL AND MINING',
      'R&D'
    ]
  };

  const translations = {
    tr: {
      adminLogin: 'Yönetici Girişi',
      username: 'Kullanıcı Adı',
      password: 'Şifre',
      login: 'Giriş Yap',
      invalidCredentials: 'Geçersiz kullanıcı adı veya şifre',
      addProduct: 'Yeni Ürün Ekle',
      logout: 'Çıkış Yap',
      category: 'Kategori*',
      selectCategory: 'Kategori Seçin',
      productName: 'Ürün Adı*',
      summary: 'Özet',
      description: 'Açıklama',
      technical: 'Teknik Detaylar',
      addProductButton: 'Ürün Ekle',
      loading: 'Ekleniyor...',
      productRequired: 'Ürün adı gereklidir',
      categoryRequired: 'Kategori seçimi gereklidir',
      success: 'Ürün başarıyla eklendi!',
      error: 'Ürün ekleme sırasında bir hata oluştu',
      images: 'Ürün Görselleri',
      selectImages: 'Görselleri Seçin',
      selectedImages: 'Seçilen görseller',
      removeImage: 'Kaldır',
      imageError: 'Görselleri yüklerken bir hata oluştu',
      categories: 'Kategoriler',
      productsIn: 'Ürünler',
      edit: 'Düzenle',
      updateProduct: 'Ürün Güncelle',
      cancel: 'İptal',
      updateSuccess: 'Ürün başarıyla güncellendi!',
      updateError: 'Ürün güncellenirken bir hata oluştu',
      selectMode: 'Yönetim Paneli',
      editProducts: 'Ürünleri Düzenle',
      selectFiles: 'Dosyaları Seç',
      noFileSelected: 'Dosya seçilmedi'
    },
    en: {
      adminLogin: 'Admin Login',
      username: 'Username',
      password: 'Password',
      login: 'Login',
      invalidCredentials: 'Invalid username or password',
      addProduct: 'Add New Product',
      logout: 'Logout',
      category: 'Category*',
      selectCategory: 'Select Category',
      productName: 'Product Name*',
      summary: 'Summary',
      description: 'Description',
      technical: 'Technical Details',
      addProductButton: 'Add Product',
      loading: 'Adding...',
      productRequired: 'Product name is required',
      categoryRequired: 'Category selection is required',
      success: 'Product added successfully!',
      error: 'An error occurred while adding the product',
      images: 'Product Images',
      selectImages: 'Select Images',
      selectedImages: 'Selected images',
      removeImage: 'Remove',
      imageError: 'An error occurred while uploading images',
      categories: 'Categories',
      productsIn: 'Products in',
      edit: 'Edit',
      updateProduct: 'Update Product',
      cancel: 'Cancel',
      updateSuccess: 'Product updated successfully!',
      updateError: 'An error occurred while updating the product',
      selectMode: 'Admin Panel',
      editProducts: 'Edit Products',
      selectFiles: 'Select Files',
      noFileSelected: 'No file selected'
    }
  };

  const t = translations[isEnglish ? 'en' : 'tr'];
  const currentCategories = categories[isEnglish ? 'en' : 'tr'];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === process.env.NEXT_PUBLIC_ADMIN_USERNAME &&
      password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError(t.invalidCredentials);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUsername('');
    setPassword('');
  };

  const convertToSlug = (text: string) => {
    // Trim the text first to remove any leading/trailing spaces
    const trimmedText = text.trim();

    // Convert Turkish characters to English equivalents
    const turkishChars: Record<string, string> = {
      'ğ': 'g', 'Ğ': 'G', 'ü': 'u', 'Ü': 'U', 'ş': 's', 'Ş': 'S',
      'ı': 'i', 'İ': 'I', 'ö': 'o', 'Ö': 'O', 'ç': 'c', 'Ç': 'C'
    };

    // Replace Turkish characters and convert to lowercase
    const normalizedText = trimmedText.toLowerCase().replace(
      /[ğĞüÜşŞıİöÖçÇ]/g,
      match => turkishChars[match] || match
    );

    // Replace spaces with dashes and remove other special characters
    return normalizedText.replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  };

  // Handle text area key press to preserve line breaks
  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      const target = e.target as HTMLTextAreaElement;
      const cursorPosition = target.selectionStart;
      const currentValue = target.value;

      // Insert actual newline character at cursor position
      const newValue =
        currentValue.substring(0, cursorPosition) +
        '\n' +
        currentValue.substring(cursorPosition);

      // Update the corresponding state based on target id
      switch (target.id) {
        case 'summary':
          setSummary(newValue);
          break;
        case 'description':
          setDescription(newValue);
          break;
        case 'technical':
          setTechnical(newValue);
          break;
      }

      // Set cursor position after the inserted newline
      setTimeout(() => {
        target.selectionStart = cursorPosition + 1;
        target.selectionEnd = cursorPosition + 1;
      }, 0);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files);
      setSelectedImages(prev => [...prev, ...filesArray]);

      // Encode the images
      filesArray.forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (typeof reader.result === 'string') {
            setEncodedImages(prevImages => [...prevImages, reader.result as string]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    setSelectedImages(prev => {
      const newArray = [...prev];
      newArray.splice(index, 1);
      return newArray;
    });

    setEncodedImages(prev => {
      const newArray = [...prev];
      newArray.splice(index, 1);
      return newArray;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: '', type: '' });

    // Store form values before submission
    const formData = {
      name,
      description,
      summary,
      technical,
      selectedCategory,
      selectedImages: [...selectedImages],
      encodedImages: [...encodedImages]
    };

    try {
      if (!name.trim()) {
        throw new Error(t.productRequired);
      }

      if (!selectedCategory) {
        throw new Error(t.categoryRequired);
      }

      const slug = convertToSlug(name);

      // First, get the current products list from the category
      const categoryRef = doc(db, 'pages', selectedCategory);
      const categoryDoc = await getDoc(categoryRef);
      const currentProducts = categoryDoc.exists() ? categoryDoc.data().products || '' : '';

      // Add the new product to the list with escaped newline
      const updatedProducts = currentProducts + name + ' \\n';

      // Update the category document with the new products list
      await setDoc(categoryRef, {
        products: updatedProducts
      }, { merge: true });

      // Join encoded images with escaped newlines
      const imagesString = encodedImages.join(' \\n');

      // Also store the product details in the products collection
      const productRef = doc(collection(db, 'products'), slug);
      await setDoc(productRef, {
        name,
        category: selectedCategory,
        description: description.replace(/\n/g, '\\n'),
        summary: summary.replace(/\n/g, '\\n'),
        technical: technical.replace(/\n/g, '\\n'),
        images: imagesString
      });

      // Clear form fields
      setName('');
      setDescription('');
      setSummary('');
      setTechnical('');
      setSelectedCategory('');
      setSelectedImages([]);
      setEncodedImages([]);
      setMessage({ text: t.success, type: 'success' });
    } catch (error) {
      console.error('Error adding document: ', error);
      setMessage({
        text: error instanceof Error ? error.message : t.error,
        type: 'error'
      });
      // Restore form values on error
      setName(formData.name);
      setDescription(formData.description);
      setSummary(formData.summary);
      setTechnical(formData.technical);
      setSelectedCategory(formData.selectedCategory);
      setSelectedImages(formData.selectedImages);
      setEncodedImages(formData.encodedImages);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategoryProducts = async (category: string) => {
    setIsLoadingProducts(true);
    try {
      const categoryRef = doc(db, 'pages', category);
      const categoryDoc = await getDoc(categoryRef);

      if (categoryDoc.exists()) {
        const data = categoryDoc.data();
        if (data.products) {
          const productsList = data.products
            .replace(/\r\n/g, '\n')
            .replace(/\\n/g, '\n')
            .split(/\n+/)
            .filter(Boolean)
            .map((p: string) => p.trim());
          setCategoryProducts(productsList);
        } else {
          setCategoryProducts([]);
        }
      } else {
        setCategoryProducts([]);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setMessage({
        text: 'Error fetching products',
        type: 'error'
      });
    } finally {
      setIsLoadingProducts(false);
    }
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    fetchCategoryProducts(category);
  };

  const handleProductSelect = async (productName: string) => {
    setSelectedProduct(productName);
    setViewMode('edit');
    setName(productName);

    try {
      const slug = convertToSlug(productName);
      const productRef = doc(db, 'products', slug);
      const productDoc = await getDoc(productRef);

      if (productDoc.exists()) {
        const data = productDoc.data();
        setDescription(data.description?.replace(/\\n/g, '\n') || '');
        setSummary(data.summary?.replace(/\\n/g, '\n') || '');
        setTechnical(data.technical?.replace(/\\n/g, '\n') || '');

        if (data.images) {
          const images = data.images.split(' \\n');
          setEncodedImages(images);
        }
      }
    } catch (error) {
      console.error('Error fetching product details:', error);
      setMessage({
        text: 'Error fetching product details',
        type: 'error'
      });
    }
  };

  const handleUpdateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct) return;

    setLoading(true);
    setMessage({ text: '', type: '' });

    try {
      const slug = convertToSlug(selectedProduct);
      const productRef = doc(db, 'products', slug);

      // Update product details
      await updateDoc(productRef, {
        name,
        description: description.replace(/\n/g, '\\n'),
        summary: summary.replace(/\n/g, '\\n'),
        technical: technical.replace(/\n/g, '\\n'),
        images: encodedImages.join(' \\n')
      });

      // Update the product name in the category's products list if it changed
      if (name !== selectedProduct) {
        const categoryRef = doc(db, 'pages', selectedCategory);
        const categoryDoc = await getDoc(categoryRef);

        if (categoryDoc.exists()) {
          const data = categoryDoc.data();
          if (data.products) {
            const updatedProducts = data.products.replace(
              selectedProduct,
              name
            );
            await updateDoc(categoryRef, {
              products: updatedProducts
            });
          }
        }
      }

      setMessage({ text: t.updateSuccess, type: 'success' });
      fetchCategoryProducts(selectedCategory);
      setViewMode('add');
      setSelectedProduct(null);
      resetForm();
    } catch (error) {
      console.error('Error updating product:', error);
      setMessage({
        text: t.updateError,
        type: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (productName: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      const slug = convertToSlug(productName);

      // Delete from products collection
      await deleteDoc(doc(db, 'products', slug));

      // Remove from category's products list
      const categoryRef = doc(db, 'pages', selectedCategory);
      const categoryDoc = await getDoc(categoryRef);

      if (categoryDoc.exists()) {
        const data = categoryDoc.data();
        if (data.products) {
          const updatedProducts = data.products
            .replace(/\r\n/g, '\n')
            .replace(/\\n/g, '\n')
            .split(/\n+/)
            .filter((p: string) => p.trim() !== productName)
            .join(' \\n');

          await updateDoc(categoryRef, {
            products: updatedProducts
          });
        }
      }

      setMessage({ text: 'Product deleted successfully!', type: 'success' });
      fetchCategoryProducts(selectedCategory);
      if (selectedProduct === productName) {
        setViewMode('add');
        setSelectedProduct(null);
        resetForm();
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      setMessage({
        text: 'Error deleting product',
        type: 'error'
      });
    }
  };

  const resetForm = () => {
    setName('');
    setDescription('');
    setSummary('');
    setTechnical('');
    setSelectedImages([]);
    setEncodedImages([]);
  };

  // Add this new function to handle file input click
  const triggerFileInput = () => {
    document.getElementById('images')?.click();
  };

  const resetAllStates = () => {
    setAdminMode('select');
    setSelectedCategory('');
    setCategoryProducts([]);
    setSelectedProduct(null);
    setViewMode('add');
    setName('');
    setDescription('');
    setSummary('');
    setTechnical('');
    setSelectedImages([]);
    setEncodedImages([]);
    setMessage({ text: '', type: '' });
  };

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto p-6 max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">{t.adminLogin}</h1>
        <form onSubmit={handleLogin} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
          <div>
            <label htmlFor="username" className="block text-base font-semibold text-gray-800 mb-2">
              {t.username}
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded text-gray-800 text-base font-medium focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-base font-semibold text-gray-800 mb-2">
              {t.password}
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded text-gray-800 text-base font-medium focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>

          {authError && (
            <div className="text-red-600 text-sm">{authError}</div>
          )}

          <button
            type="submit"
            className="w-full px-6 py-3 bg-blue-600 text-white rounded font-semibold text-base hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {t.login}
          </button>
        </form>
      </div>
    );
  }

  if (adminMode === 'select') {
    return (
      <div className="container mx-auto p-6 max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">{t.selectMode}</h1>
          <div className="flex gap-4">
            <button
              onClick={() => setIsEnglish(!isEnglish)}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg font-semibold text-sm hover:bg-gray-700 transition-colors"
            >
              {isEnglish ? 'TR' : 'EN'}
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-lg font-semibold text-sm hover:bg-red-700 transition-colors"
            >
              {t.logout}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <button
            onClick={() => setAdminMode('edit')}
            className="p-8 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow text-center"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{t.editProducts}</h2>
            <p className="text-gray-600">Mevcut ürünleri düzenleyin ve güncelleyin</p>
          </button>

          <button
            onClick={() => setAdminMode('add')}
            className="p-8 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow text-center"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{t.addProduct}</h2>
            <p className="text-gray-600">Yeni ürün ekleyin</p>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-[90%]">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          {adminMode === 'edit' ? t.editProducts : t.addProduct}
        </h1>
        <div className="flex gap-4">
          <button
            onClick={resetAllStates}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg font-semibold text-sm hover:bg-gray-700 transition-colors"
          >
            {t.selectMode}
          </button>
          <button
            onClick={() => setIsEnglish(!isEnglish)}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg font-semibold text-sm hover:bg-gray-700 transition-colors"
          >
            {isEnglish ? 'TR' : 'EN'}
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-lg font-semibold text-sm hover:bg-red-700 transition-colors"
          >
            {t.logout}
          </button>
        </div>
      </div>

      {message.text && (
        <div className={`mb-4 p-4 rounded font-medium text-base ${message.type === 'success' ? 'bg-green-100 text-green-800 border border-green-400' : 'bg-red-100 text-red-800 border border-red-400'}`}>
          {message.text}
        </div>
      )}

      {adminMode === 'edit' ? (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Categories List - Takes 2 columns */}
          <div className="lg:col-span-3 bg-white p-6 rounded-lg shadow-md h-fit">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">{t.categories}</h2>
            <div className="grid grid-cols-2 gap-3 mb-8">
              {currentCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategorySelect(category)}
                  className={`p-4 rounded-lg text-left transition-colors ${selectedCategory === category
                    ? 'bg-blue-100 border-2 border-blue-500 text-blue-800'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                    }`}
                >
                  <span className="font-medium text-lg">{category}</span>
                </button>
              ))}
            </div>

            {selectedCategory && (
              <div>
                <h3 className="text-xl font-bold mb-6 text-gray-800">{t.productsIn} {selectedCategory}</h3>
                {isLoadingProducts ? (
                  <div className="flex justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
                    {categoryProducts.map((product) => (
                      <div
                        key={product}
                        className="flex flex-col gap-2 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <span className="font-medium text-gray-800 text-base line-clamp-2 min-h-[3rem]">{product}</span>
                        <button
                          onClick={() => handleProductSelect(product)}
                          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium mt-auto"
                        >
                          {t.edit}
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Product Form - Takes 3 columns */}
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              {adminMode === 'edit' ? t.updateProduct : t.addProduct}
            </h2>
            <form onSubmit={selectedProduct ? handleUpdateProduct : handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="category" className="block text-lg font-semibold text-gray-800 mb-2">
                  {t.category}
                </label>
                <select
                  id="category"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg text-gray-800 text-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  required
                >
                  <option value="">{t.selectCategory}</option>
                  {currentCategories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="name" className="block text-lg font-semibold text-gray-800 mb-2">
                  {t.productName}
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg text-gray-800 text-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="summary" className="block text-lg font-semibold text-gray-800 mb-2">
                  {t.summary}
                </label>
                <textarea
                  id="summary"
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  onKeyDown={handleKeyPress}
                  className="w-full p-3 border border-gray-300 rounded-lg text-gray-800 text-lg h-24 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  placeholder={t.summary}
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-lg font-semibold text-gray-800 mb-2">
                  {t.description}
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  onKeyDown={handleKeyPress}
                  className="w-full p-3 border border-gray-300 rounded-lg text-gray-800 text-lg h-36 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  placeholder={t.description}
                />
              </div>

              <div>
                <label htmlFor="technical" className="block text-lg font-semibold text-gray-800 mb-2">
                  {t.technical}
                </label>
                <textarea
                  id="technical"
                  value={technical}
                  onChange={(e) => setTechnical(e.target.value)}
                  onKeyDown={handleKeyPress}
                  className="w-full p-3 border border-gray-300 rounded-lg text-gray-800 text-lg h-36 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-mono leading-relaxed"
                  placeholder={t.technical}
                />
              </div>

              <div>
                <label htmlFor="images" className="block text-lg font-semibold text-gray-800 mb-2">
                  {t.images}
                </label>
                <div className="flex flex-col gap-2">
                  <div className="relative">
                    <input
                      type="file"
                      id="images"
                      accept="image/*"
                      multiple
                      onChange={handleImageChange}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={triggerFileInput}
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-800 text-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-left"
                    >
                      {t.selectFiles}
                    </button>
                    <p className="mt-2 text-sm text-gray-500">
                      {encodedImages.length === 0 ? t.noFileSelected : `${encodedImages.length} dosya seçildi`}
                    </p>
                  </div>

                  {encodedImages.length > 0 && (
                    <div className="mt-4">
                      <p className="font-medium text-lg mb-3 text-gray-800">{t.selectedImages} ({encodedImages.length}):</p>
                      <div className="flex flex-wrap gap-3">
                        {encodedImages.map((image, index) => (
                          <div key={index} className="relative">
                            <img
                              src={image}
                              alt={`Preview ${index}`}
                              className="h-24 w-24 object-cover rounded-lg border border-gray-300"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-700"
                              title={t.removeImage}
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className={`flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${loading ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                >
                  {loading ? t.loading : adminMode === 'edit' ? t.updateProduct : t.addProductButton}
                </button>
                {selectedProduct && (
                  <button
                    type="button"
                    onClick={() => {
                      setViewMode('add');
                      setSelectedProduct(null);
                      resetForm();
                      setAdminMode('edit');
                    }}
                    className="px-6 py-3 bg-gray-600 text-white rounded-lg font-semibold text-lg hover:bg-gray-700 transition-colors"
                  >
                    {t.cancel}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      ) : adminMode === 'add' ? (
        // Add Product Form - Full width centered
        <div className="max-w-3xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">{t.addProduct}</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="category" className="block text-lg font-semibold text-gray-800 mb-2">
                  {t.category}
                </label>
                <select
                  id="category"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg text-gray-800 text-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  required
                >
                  <option value="">{t.selectCategory}</option>
                  {currentCategories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="name" className="block text-lg font-semibold text-gray-800 mb-2">
                  {t.productName}
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg text-gray-800 text-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="summary" className="block text-lg font-semibold text-gray-800 mb-2">
                  {t.summary}
                </label>
                <textarea
                  id="summary"
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  onKeyDown={handleKeyPress}
                  className="w-full p-3 border border-gray-300 rounded-lg text-gray-800 text-lg h-24 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  placeholder={t.summary}
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-lg font-semibold text-gray-800 mb-2">
                  {t.description}
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  onKeyDown={handleKeyPress}
                  className="w-full p-3 border border-gray-300 rounded-lg text-gray-800 text-lg h-36 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  placeholder={t.description}
                />
              </div>

              <div>
                <label htmlFor="technical" className="block text-lg font-semibold text-gray-800 mb-2">
                  {t.technical}
                </label>
                <textarea
                  id="technical"
                  value={technical}
                  onChange={(e) => setTechnical(e.target.value)}
                  onKeyDown={handleKeyPress}
                  className="w-full p-3 border border-gray-300 rounded-lg text-gray-800 text-lg h-36 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-mono leading-relaxed"
                  placeholder={t.technical}
                />
              </div>

              <div>
                <label htmlFor="images" className="block text-lg font-semibold text-gray-800 mb-2">
                  {t.images}
                </label>
                <div className="flex flex-col gap-2">
                  <div className="relative">
                    <input
                      type="file"
                      id="images"
                      accept="image/*"
                      multiple
                      onChange={handleImageChange}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={triggerFileInput}
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-800 text-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-left"
                    >
                      {t.selectFiles}
                    </button>
                    <p className="mt-2 text-sm text-gray-500">
                      {encodedImages.length === 0 ? t.noFileSelected : `${encodedImages.length} dosya seçildi`}
                    </p>
                  </div>

                  {encodedImages.length > 0 && (
                    <div className="mt-4">
                      <p className="font-medium text-lg mb-3 text-gray-800">{t.selectedImages} ({encodedImages.length}):</p>
                      <div className="flex flex-wrap gap-3">
                        {encodedImages.map((image, index) => (
                          <div key={index} className="relative">
                            <img
                              src={image}
                              alt={`Preview ${index}`}
                              className="h-24 w-24 object-cover rounded-lg border border-gray-300"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-700"
                              title={t.removeImage}
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className={`flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${loading ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                >
                  {loading ? t.loading : t.addProductButton}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
} 