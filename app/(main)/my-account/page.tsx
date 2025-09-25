"use client";
import { useState, useEffect } from 'react';
import { User, Mail, Phone, MapPin, Package, Edit, Eye, Calendar, Shield, Clock, Save, X, Check, Navigation, Plus, Trash2 } from 'lucide-react';
import axios from 'axios';
import useAuthStore from '@/hooks/auth/useAuthStore';
import withAuth from '@/components/withAuth/withAuth';
import { axiosProtected } from '@/services/axiosService';

interface Order {
  id: string;
  amount: number;
  date: string;
  status: string;
  items: number;
}

interface EditForm {
  first_name?: string;
  last_name?: string;
  email?: string;
  mobile_no?: string;
  [key: string]: any;
}

interface Address {
  id: number;
  address: string;
  pin_code: string;
  is_default: boolean;
  [key: string]: any;
}

interface AddressForm {
  address?: string;
  pin_code?: string;
  is_default?: boolean;
  [key: string]: any;
}

interface SaveStatus {
  type: string;
  message: string;
}

const MyAccountPage = () => {
  const [activeTab, setActiveTab] = useState('personal');
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [editForm, setEditForm] = useState<EditForm>({});
  const [addressForm, setAddressForm] = useState<AddressForm>({});
  const [isLoading, setIsLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>({ type: '', message: '' });
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [editingAddressId, setEditingAddressId] = useState<number | null>(null);
  const { user } = useAuthStore();

  // Mock order data
  const orders: Order[] = [
    { id: 'ORD-2025-001', amount: 2499.99, date: '2025-09-05', status: 'Delivered', items: 3 },
    { id: 'ORD-2025-002', amount: 1299.50, date: '2025-08-28', status: 'Shipped', items: 2 },
    { id: 'ORD-2025-003', amount: 3799.00, date: '2025-08-15', status: 'Processing', items: 5 },
  ];

  // Mock addresses data
  const mockAddresses: Address[] = [
    { id: 1, address: "vill: bhaktapat, p.o: petbindhi, dist: jhargram, West Bengal, 721517", pin_code: "721517", is_default: true },
    { id: 2, address: "123 Main Street, Apartment 4B, Kolkata, West Bengal", pin_code: "700001", is_default: false },
    { id: 3, address: "Office: Tech Park Building, Sector V, Salt Lake, Kolkata", pin_code: "700091", is_default: false },
  ];
 useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosProtected.get("/accounts/profile/")
      } catch (err: any) {
        console.log(err.message)
      } 
    }

    fetchData()
  }, [])
  useEffect(() => {
  if (user) {
    setEditForm({
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      mobile_no: user.mobile_no,
    });

    setAddresses(mockAddresses);
  }
}, [user]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatLastLogin = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setEditForm(prev => ({ ...prev, [field]: value }));
  };

  const handleAddressChange = (field: string, value: string | boolean) => {
    setAddressForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const response = await axios.put('/api/user/profile', editForm);
      setIsEditing(false);
      setSaveStatus({ type: 'success', message: 'Profile updated successfully!' });
    } catch (error) {
      console.error('Error updating profile:', error);
      setSaveStatus({ type: 'error', message: 'Failed to update profile. Please try again.' });
    } finally {
      setIsLoading(false);
      setTimeout(() => setSaveStatus({ type: '', message: '' }), 3000);
    }
  };

  const handleSaveAddress = async () => {
    setIsLoading(true);
    try {
      if (isAddingAddress) {
        // API call to add new address
        const response = await axios.post('/api/user/addresses', addressForm);
        setAddresses(prev => [...prev, response.data]);
        setSaveStatus({ type: 'success', message: 'Address added successfully!' });
        setIsAddingAddress(false);
      } else if (editingAddressId) {
        // API call to update existing address
        const response = await axios.put(`/api/user/addresses/${editingAddressId}`, addressForm);
        setAddresses(prev => prev.map(addr =>
          addr.id === editingAddressId ? response.data : addr
        ));
        setSaveStatus({ type: 'success', message: 'Address updated successfully!' });
        setIsEditingAddress(false);
        setEditingAddressId(null);
      }
      setAddressForm({});
    } catch (error) {
      console.error('Error saving address:', error);
      setSaveStatus({ type: 'error', message: 'Failed to save address. Please try again.' });
    } finally {
      setIsLoading(false);
      setTimeout(() => setSaveStatus({ type: '', message: '' }), 3000);
    }
  };

  const handleDeleteAddress = async (addressId: number) => {
    if (!confirm('Are you sure you want to delete this address?')) return;

    setIsLoading(true);
    try {
      // API call to delete address
      await axios.delete(`/api/user/addresses/${addressId}`);
      setAddresses(prev => prev.filter(addr => addr.id !== addressId));
      setSaveStatus({ type: 'success', message: 'Address deleted successfully!' });
    } catch (error) {
      console.error('Error deleting address:', error);
      setSaveStatus({ type: 'error', message: 'Failed to delete address. Please try again.' });
    } finally {
      setIsLoading(false);
      setTimeout(() => setSaveStatus({ type: '', message: '' }), 3000);
    }
  };

  const handleSetDefaultAddress = async (addressId: number) => {
    setIsLoading(true);
    try {
      // API call to set default address
      const response = await axios.patch(`/api/user/addresses/${addressId}/set-default`);
      setAddresses(prev => prev.map(addr => ({
        ...addr,
        is_default: addr.id === addressId
      })));
      setSaveStatus({ type: 'success', message: 'Default address updated successfully!' });
    } catch (error) {
      console.error('Error setting default address:', error);
      setSaveStatus({ type: 'error', message: 'Failed to set default address. Please try again.' });
    } finally {
      setIsLoading(false);
      setTimeout(() => setSaveStatus({ type: '', message: '' }), 3000);
    }
  };

  const startEditingAddress = (address: Address) => {
    setAddressForm({
      address: address.address,
      pin_code: address.pin_code,
      is_default: address.is_default
    });
    setEditingAddressId(address.id);
    setIsEditingAddress(true);
    setIsAddingAddress(false);
  };

  const startAddingAddress = () => {
    setAddressForm({
      address: '',
      pin_code: '',
      is_default: false
    });
    setIsAddingAddress(true);
    setIsEditingAddress(false);
    setEditingAddressId(null);
  };

  const cancelAddressEdit = () => {
    setIsEditingAddress(false);
    setIsAddingAddress(false);
    setEditingAddressId(null);
    setAddressForm({});
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered': return 'text-green-600 bg-green-100';
      case 'shipped': return 'text-blue-600 bg-blue-100';
      case 'processing': return 'text-orange-600 bg-orange-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="px-4 py-8 lg:px-16 lg:py-12">
        <div className="max-w-6xl mx-auto">
          {/* Save Status Notification */}
          {saveStatus.message && (
            <div className={`fixed top-4 right-4 z-50 px-6 py-4 rounded-lg shadow-lg transition-all duration-300 transform ${saveStatus.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'} ${saveStatus.message ? 'translate-y-0 opacity-100' : '-translate-y-8 opacity-0'}`}>
              <div className="flex items-center">
                {saveStatus.type === 'success' ? (
                  <Check className="w-5 h-5 mr-2" />
                ) : (
                  <X className=" w-5 h-5 mr-2" />
                )}
                <span>{saveStatus.message}</span>
              </div>
            </div>
          )}

          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                {user.first_name?.[0]}{user.last_name?.[0]}
              </div>
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 dark:text-white">
                  Welcome back, {user.first_name}!
                </h1>
                <div className="flex items-center space-x-4 mt-2">
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <Clock className="w-4 h-4 mr-1" />
                    Last login: {user.last_login ? formatLastLogin(user.last_login) : 'Never'}
                  </div>
                  {user.is_superuser && (
                    <span className="flex items-center text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                      <Shield className="w-3 h-3 mr-1" />
                      Admin
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl mb-6 overflow-hidden">
            <div className="flex border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
              {[
                { id: 'personal', label: 'Personal Info', icon: User },
                { id: 'address', label: 'Address', icon: MapPin },
                { id: 'orders', label: 'Order History', icon: Package }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 px-6 py-4 font-medium transition-all duration-300 min-w-max ${activeTab === tab.id
                      ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                      : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                      }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="p-6">
              {/* Personal Information Tab */}
              {activeTab === 'personal' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Personal Information</h2>
                    <button
                      onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                      disabled={isLoading}
                      className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-70"
                    >
                      {isLoading ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      ) : isEditing ? (
                        <Save className="w-4 h-4" />
                      ) : (
                        <Edit className="w-4 h-4" />
                      )}
                      <span>{isEditing ? (isLoading ? 'Saving...' : 'Save Changes') : 'Edit Profile'}</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          First Name
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            value={editForm.first_name || ''}
                            onChange={(e) => handleInputChange('first_name', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white transition-all duration-300"
                          />
                        ) : (
                          <p className="text-gray-800 dark:text-white text-lg p-2 rounded-lg bg-gray-50 dark:bg-gray-800">{user.first_name || 'Not provided'}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Last Name
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            value={editForm.last_name || ''}
                            onChange={(e) => handleInputChange('last_name', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white transition-all duration-300"
                          />
                        ) : (
                          <p className="text-gray-800 dark:text-white text-lg p-2 rounded-lg bg-gray-50 dark:bg-gray-800">{user.last_name || 'Not provided'}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Username
                        </label>
                        <p className="text-gray-800 dark:text-white text-lg p-2 rounded-lg bg-gray-50 dark:bg-gray-800">{user.username || 'Not set'}</p>
                        <p className="text-xs text-gray-500 mt-1">Username cannot be changed</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          <Mail className="inline w-4 h-4 mr-1" />
                          Email Address
                        </label>
                        {isEditing ? (
                          <div className="relative">
                            <input
                              type="email"
                              value={editForm.email || ''}
                              onChange={(e) => handleInputChange('email', e.target.value)}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white transition-all duration-300 pr-10"
                              disabled
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                              <span className="text-gray-500 text-sm">Cannot change</span>
                            </div>
                          </div>
                        ) : (
                          <p className="text-gray-800 dark:text-white text-lg p-2 rounded-lg bg-gray-50 dark:bg-gray-800">{user.email}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          <Phone className="inline w-4 h-4 mr-1" />
                          Mobile Number
                        </label>
                        {isEditing ? (
                          <div className="relative">
                            <input
                              type="tel"
                              value={editForm.mobile_no || ''}
                              onChange={(e) => handleInputChange('mobile_no', e.target.value)}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white transition-all duration-300 pr-10"
                              disabled
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                              <span className="text-gray-500 text-sm">Cannot change</span>
                            </div>
                          </div>
                        ) : (
                          <p className="text-gray-800 dark:text-white text-lg p-2 rounded-lg bg-gray-50 dark:bg-gray-800">{user.mobile_no}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          <Calendar className="inline w-4 h-4 mr-1" />
                          Member Since
                        </label>
                        <p className="text-gray-800 dark:text-white text-lg p-2 rounded-lg bg-gray-50 dark:bg-gray-800">{user.created_at ? formatDate(user.created_at) : 'N/A'}</p>
                      </div>
                    </div>
                  </div>

                  {isEditing && (
                    <div className="flex space-x-4 pt-4">
                      <button
                        onClick={() => {
                          setIsEditing(false);
                          setEditForm({
                            first_name: user.first_name,
                            last_name: user.last_name,
                            email: user.email,
                            mobile_no: user.mobile_no
                          });
                        }}
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Address Tab */}
              {activeTab === 'address' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Delivery Addresses</h2>
                    <button
                      onClick={startAddingAddress}
                      disabled={isLoading}
                      className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-70"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add New Address</span>
                    </button>
                  </div>

                  {/* Add/Edit Address Form */}
                  {(isAddingAddress || isEditingAddress) && (
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 p-6 rounded-2xl border border-blue-100 dark:border-gray-600 transition-all duration-300 mb-6">
                      <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                        {isAddingAddress ? 'Add New Address' : 'Edit Address'}
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Full Address
                          </label>
                          <textarea
                            value={addressForm.address || ''}
                            onChange={(e) => handleAddressChange('address', e.target.value)}
                            rows={3}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white transition-all duration-300"
                            placeholder="Enter your complete address"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            PIN Code
                          </label>
                          <input
                            type="text"
                            value={addressForm.pin_code || ''}
                            onChange={(e) => handleAddressChange('pin_code', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white transition-all duration-300"
                            placeholder="Enter PIN code"
                          />
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="defaultAddress"
                            checked={addressForm.is_default || false}
                            onChange={(e) => handleAddressChange('is_default', e.target.checked)}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          />
                          <label htmlFor="defaultAddress" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                            Set as default address
                          </label>
                        </div>
                        <div className="flex space-x-4 pt-4">
                          <button
                            onClick={handleSaveAddress}
                            disabled={isLoading}
                            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-70"
                          >
                            {isLoading ? (
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                            ) : (
                              <Save className="w-4 h-4" />
                            )}
                            <span>{isLoading ? 'Saving...' : 'Save Address'}</span>
                          </button>
                          <button
                            onClick={cancelAddressEdit}
                            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Address List */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {addresses.map((address) => (
                      <div key={address.id} className={`bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 p-6 rounded-2xl border transition-all duration-300 ${address.is_default ? 'border-blue-300 dark:border-blue-700 shadow-md' : 'border-gray-200 dark:border-gray-600'}`}>
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <MapPin className={`w-5 h-5 ${address.is_default ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500'}`} />
                            {address.is_default && (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                                Default
                              </span>
                            )}
                          </div>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => startEditingAddress(address)}
                              className="p-1.5 text-gray-500 hover:text-blue-600 transition-colors"
                              title="Edit address"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            {!address.is_default && (
                              <button
                                onClick={() => handleDeleteAddress(address.id)}
                                className="p-1.5 text-gray-500 hover:text-red-600 transition-colors"
                                title="Delete address"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </div>

                        <div className="mb-4">
                          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{address.address}</p>
                          <div className="flex items-center mt-3">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                              <Navigation className="w-3 h-3 mr-1" />
                              PIN: {address.pin_code}
                            </span>
                          </div>
                        </div>

                        {!address.is_default && (
                          <button
                            onClick={() => handleSetDefaultAddress(address.id)}
                            disabled={isLoading}
                            className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg transition-colors text-sm font-medium disabled:opacity-50"
                          >
                            Set as Default
                          </button>
                        )}
                      </div>
                    ))}
                  </div>

                  {addresses.length === 0 && !isAddingAddress && (
                    <div className="text-center py-12">
                      <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500 dark:text-gray-400 mb-4">No addresses found</p>
                      <button
                        onClick={startAddingAddress}
                        className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg transition-all duration-300 shadow-md hover:shadow-lg mx-auto"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add Your First Address</span>
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Orders Tab */}
              {activeTab === 'orders' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Order History</h2>

                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div key={order.id} className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-md transition-all duration-300 bg-white dark:bg-gray-800">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 rounded-full flex items-center justify-center shadow-inner">
                              <Package className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                              <h3 className="text-lg font-medium text-gray-800 dark:text-white">{order.id}</h3>
                              <p className="text-sm text-gray-500 dark:text-gray-400">{order.items} items</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-xl font-semibold text-gray-800 dark:text-white">₹{order.amount.toLocaleString()}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{formatDate(order.date)}</p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                          <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors">
                            <Eye className="w-4 h-4" />
                            <span>View Details</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {orders.length === 0 && (
                    <div className="text-center py-12">
                      <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500 dark:text-gray-400">No orders found</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAuth(MyAccountPage);