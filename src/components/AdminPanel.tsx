import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  Search, 
  LogOut, 
  RefreshCw, 
  Lock, 
  User, 
  DollarSign, 
  Clock, 
  ArrowLeft, 
  Check, 
  Eye, 
  EyeOff, 
  Filter, 
  FileSpreadsheet, 
  PhoneCall, 
  ArrowRightLeft,
  Plus,
  Trash2,
  Edit
} from 'lucide-react';

interface PaymentRecord {
  id: string;
  studentName: string;
  studentEmail: string;
  phone: string;
  transactionId: string;
  planName: string;
  planPrice: string;
  timestamp: string;
  status: 'pending' | 'approved' | 'declined';
  nameBangla?: string;
}

interface AdminPanelProps {
  onClose: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ onClose }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Payments logic states
  const [payments, setPayments] = useState<PaymentRecord[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved' | 'declined'>('all');
  const [isUpdatingId, setIsUpdatingId] = useState<string | null>(null);

  // New CRUD States
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingRecord, setEditingRecord] = useState<PaymentRecord | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeletingId, setIsDeletingId] = useState<string | null>(null);

  // Form Fields State
  const [formName, setFormName] = useState('');
  const [formNameBangla, setFormNameBangla] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formTransactionId, setFormTransactionId] = useState('');
  const [formPlanName, setFormPlanName] = useState('Premium Live Batch');
  const [formPlanPrice, setFormPlanPrice] = useState('৳ 2,999');
  const [formStatus, setFormStatus] = useState<'pending' | 'approved' | 'declined'>('pending');

  const resetForm = () => {
    setFormName('');
    setFormNameBangla('');
    setFormEmail('');
    setFormPhone('');
    setFormTransactionId('');
    setFormPlanName('Premium Live Batch');
    setFormPlanPrice('৳ 2,999');
    setFormStatus('pending');
  };

  const openAddModal = () => {
    resetForm();
    setShowAddModal(true);
  };

  const openEditModal = (p: PaymentRecord) => {
    setFormName(p.studentName);
    setFormNameBangla(p.nameBangla || '');
    setFormEmail(p.studentEmail || '');
    setFormPhone(p.phone);
    setFormTransactionId(p.transactionId);
    setFormPlanName(p.planName);
    setFormPlanPrice(p.planPrice);
    setFormStatus(p.status);
    setEditingRecord(p);
    setShowEditModal(true);
  };

  // Load token from local storage on mount
  useEffect(() => {
    const savedToken = localStorage.getItem('ielts_admin_token');
    if (savedToken) {
      setToken(savedToken);
      setIsLoggedIn(true);
      fetchPayments(savedToken);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setLoginError('Please enter username and password.');
      return;
    }

    setLoginError('');
    setIsLoggingIn(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setToken(data.token);
        localStorage.setItem('ielts_admin_token', data.token);
        setIsLoggedIn(true);
        fetchPayments(data.token);
      } else {
        setLoginError(data.error || 'Invalid username or password!');
      }
    } catch (err) {
      console.error('Login request failed:', err);
      setLoginError('Failed to connect to server. Please try again.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('ielts_admin_token');
    setToken('');
    setIsLoggedIn(false);
    setPayments([]);
  };

  const fetchPayments = async (authToken?: string) => {
    const tokenToUse = authToken || token;
    if (!tokenToUse) return;

    setIsLoading(true);
    setApiError('');
    try {
      const res = await fetch('/api/admin/payments', {
        headers: {
          'Authorization': `Bearer ${tokenToUse}`
        }
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setPayments(data.payments || []);
      } else {
        setApiError(data.error || 'Failed to load payments list.');
        if (res.status === 401) {
          handleLogout();
        }
      }
    } catch (err) {
      console.error('Fetch payments failed:', err);
      setApiError('Unable to retrieve payment list. Please refresh the page.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (id: string, newStatus: 'pending' | 'approved' | 'declined') => {
    if (!token) return;
    setIsUpdatingId(id);

    try {
      const res = await fetch('/api/admin/update-status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ id, status: newStatus })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        // Update local status matching the record
        setPayments(prev => prev.map(p => p.id === id ? { ...p, status: newStatus } : p));
      } else {
        alert(data.error || 'Status update failed.');
      }
    } catch (err) {
      console.error('Update status failed:', err);
      alert('Disconnected from server.');
    } finally {
      setIsUpdatingId(null);
    }
  };

  const handleCreatePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formPhone.trim() || !formTransactionId.trim()) {
      alert('Phone number and transaction ID are required.');
      return;
    }
    setIsSaving(true);
    try {
      const res = await fetch('/api/admin/create-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          studentName: formName,
          nameBangla: formNameBangla,
          studentEmail: formEmail,
          phone: formPhone,
          transactionId: formTransactionId,
          planName: formPlanName,
          planPrice: formPlanPrice,
          status: formStatus
        })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setPayments(prev => [data.payment, ...prev]);
        setShowAddModal(false);
        resetForm();
      } else {
        alert(data.error || 'Unable to create payment record.');
      }
    } catch (err) {
      console.error(err);
      alert('Failed to connect to server.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleUpdatePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingRecord) return;
    if (!formPhone.trim() || !formTransactionId.trim()) {
      alert('Phone number and transaction ID are required.');
      return;
    }
    setIsSaving(true);
    try {
      const res = await fetch('/api/admin/update-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          id: editingRecord.id,
          studentName: formName,
          nameBangla: formNameBangla,
          studentEmail: formEmail,
          phone: formPhone,
          transactionId: formTransactionId,
          planName: formPlanName,
          planPrice: formPlanPrice,
          status: formStatus
        })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setPayments(prev => prev.map(p => p.id === editingRecord.id ? data.payment : p));
        setShowEditModal(false);
        setEditingRecord(null);
        resetForm();
      } else {
        alert(data.error || 'Unable to update payment record.');
      }
    } catch (err) {
      console.error(err);
      alert('Failed to connect to server.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeletePayment = async (id: string) => {
    if (!confirm('Are you sure you want to delete this payment record? This action cannot be undone.')) return;
    setIsDeletingId(id);
    try {
      const res = await fetch('/api/admin/delete-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ id })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setPayments(prev => prev.filter(p => p.id !== id));
      } else {
        alert(data.error || 'Unable to delete payment record.');
      }
    } catch (err) {
      console.error(err);
      alert('Disconnected from server.');
    } finally {
      setIsDeletingId(null);
    }
  };

  // Compute stats metrics
  const totalSubmissions = payments.length;
  const pendingCount = payments.filter(p => p.status === 'pending').length;
  const approvedCount = payments.filter(p => p.status === 'approved').length;
  const declinedCount = payments.filter(p => p.status === 'declined').length;

  // Revenue math: parses string formatted like "৳ ২,৯৯৯" or fallback to 2999
  const approvedRevenue = payments
    .filter(p => p.status === 'approved')
    .reduce((sum, p) => {
      const digitsOnly = p.planPrice.replace(/[^0-9\u09E6-\u09EF]/g, '');
      const englishDigits = digitsOnly.replace(/[\u09E6-\u09EF]/g, (d) => {
        return String('০১২৩৪৫৬৭৮৯'.indexOf(d));
      });
      const parsed = parseInt(englishDigits, 10);
      return sum + (isNaN(parsed) ? 2999 : parsed);
    }, 0);

  const getStatusBadge = (status: 'pending' | 'approved' | 'declined') => {
    switch (status) {
      case 'approved':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Approved
          </span>
        );
      case 'declined':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold text-rose-700 bg-rose-50 border border-rose-200">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
            Refused
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
            Pending
          </span>
        );
    }
  };

  // Filtered Payments list
  const filteredPayments = payments.filter(p => {
    const normalizedSearch = searchTerm.toLowerCase().trim();
    const matchesSearch = 
      p.studentName.toLowerCase().includes(normalizedSearch) ||
      p.studentEmail.toLowerCase().includes(normalizedSearch) ||
      p.phone.includes(normalizedSearch) ||
      p.transactionId.toLowerCase().includes(normalizedSearch);
    
    if (statusFilter === 'all') return matchesSearch;
    return p.status === statusFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans" id="admin-root">
      
      {/* Top Admin Header Bar */}
      <header className="bg-slate-950 border-b border-slate-800 px-6 py-4 flex flex-wrap justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-red-600 p-2 rounded-lg text-white">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg md:text-xl font-bold tracking-tight text-white flex items-center gap-2">
              IELTS Revolution <span className="text-red-500 text-xs px-2 py-0.5 bg-red-500/10 rounded border border-red-500/20">Admin Base</span>
            </h1>
            <p className="text-xs text-slate-400">Enrollment & Payment Verification Window</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={onClose}
            className="flex items-center gap-1 px-3.5 py-1.5 rounded-lg border border-slate-700 bg-slate-900 text-xs font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Landing Page
          </button>
          {isLoggedIn && (
            <button 
              onClick={handleLogout}
              className="flex items-center gap-1 px-3.5 py-1.5 rounded-lg bg-rose-600/15 text-rose-400 hover:bg-rose-600 hover:text-white border border-rose-500/20 text-xs font-medium transition cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              Logout
            </button>
          )}
        </div>
      </header>

      {/* Main Core Container */}
      <main className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full">
        
        {!isLoggedIn ? (
          /* Sleek Administration Login Form */
          <div className="max-w-md mx-auto my-12 md:my-20">
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-2xl relative">
              <div className="text-center space-y-2 mb-6">
                <div className="inline-flex p-3 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 mb-2">
                  <Lock className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-extrabold text-white">Admin Login Portal</h2>
                <p className="text-xs text-slate-400">Please login to verify and approve payments</p>
                
                {/* Auto Fill Quick Button */}
                <div className="pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      setUsername('admin');
                      setPassword('admin123');
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-200 bg-slate-800 hover:bg-slate-700 active:scale-95 transition-all text-center cursor-pointer"
                  >
                    ⚡ Auto-fill Login Info (admin / admin123)
                  </button>
                </div>
              </div>

              {loginError && (
                <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 p-3 rounded-xl text-xs flex items-center gap-2 mb-4">
                  <XCircle className="w-4 h-4 shrink-0 text-rose-500" />
                  <span>{loginError}</span>
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-300">Username</label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-slate-500">
                      <User className="w-4 h-4" />
                    </span>
                    <input 
                      type="text"
                      className="w-full pl-9 pr-4 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-red-500 transition-all font-mono"
                      placeholder="Enter Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-300">Password</label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-slate-500">
                      <Lock className="w-4 h-4" />
                    </span>
                    <input 
                      type={showPassword ? "text" : "password"}
                      className="w-full pl-9 pr-10 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-red-500 transition-all font-mono"
                      placeholder="Enter Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-slate-500 hover:text-slate-300"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button 
                  type="submit"
                  disabled={isLoggingIn}
                  className="w-full bg-red-600 hover:bg-red-500 disabled:bg-slate-800 text-white font-bold py-3 rounded-lg text-xs tracking-wider uppercase transition shadow-lg mt-4 flex items-center justify-center gap-1.5"
                >
                  {isLoggingIn ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Verifying credentials...</span>
                    </>
                  ) : (
                    <span>Login ➔</span>
                  )}
                </button>
              </form>

              <div className="mt-8 border-t border-slate-800 pt-4 text-center space-y-1">
                <p className="text-[10px] text-slate-400 font-medium">Quick Login: admin / admin123</p>
                <p className="text-[9px] text-slate-500 font-mono">Environment Credentials: administrator / Maailulp1$%</p>
              </div>
            </div>
          </div>
        ) : (
          /* Logged In Admin Dashboard */
          <div className="space-y-6">
            
            {/* Business Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 md:p-5 flex flex-col justify-between">
                <span className="text-slate-400 text-xs font-semibold">Total Revenue (Approved)</span>
                <div className="flex items-baseline mt-2 gap-1 flex-wrap">
                  <span className="text-2xl md:text-3xl font-extrabold text-amber-500 font-sans">৳ {approvedRevenue.toLocaleString('en-US')}</span>
                </div>
                <span className="text-[10px] text-emerald-500 font-bold mt-1">✓ {approvedCount} Payments Verified</span>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 md:p-5 flex flex-col justify-between">
                <span className="text-slate-400 text-xs font-semibold">Total Requests</span>
                <div className="flex items-baseline mt-2">
                  <span className="text-2xl md:text-3xl font-extrabold text-white font-mono">{totalSubmissions}</span>
                </div>
                <span className="text-[10px] text-slate-500 mt-1">End-user submissions in list</span>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 md:p-5 flex flex-col justify-between border-l-4 border-l-amber-500">
                <span className="text-slate-400 text-xs font-semibold">Pending Verification</span>
                <div className="flex items-baseline mt-2">
                  <span className="text-2xl md:text-3xl font-extrabold text-amber-400 font-mono">{pendingCount}</span>
                </div>
                <span className="text-[10px] text-amber-400 font-medium mt-1 animate-pulse">● Awaiting check</span>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 md:p-5 flex flex-col justify-between">
                <span className="text-slate-400 text-xs font-semibold">Rejected Requests</span>
                <div className="flex items-baseline mt-2">
                  <span className="text-2xl md:text-3xl font-extrabold text-rose-500 font-mono">{declinedCount}</span>
                </div>
                <span className="text-[10px] text-slate-500 mt-1">Trash/Fake TxID filter info</span>
              </div>

            </div>

            {/* Main Action Bar, Filter and Searches */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row justify-between items-center gap-4">
              
              {/* Left Search input */}
              <div className="relative w-full md:max-w-md">
                <span className="absolute left-3 top-2.5 text-slate-500">
                  <Search className="w-4 h-4" />
                </span>
                <input 
                  type="text"
                  placeholder="Search by name, phone or TrxID..."
                  className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-red-500 transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Right Filter status options */}
              <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-end">
                <span className="text-xs text-slate-400 font-semibold mr-1 flex items-center gap-1">
                  <Filter className="w-3.5 h-3.5" />
                  Filter Status:
                </span>
                
                <button
                  onClick={() => setStatusFilter('all')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                    statusFilter === 'all' 
                      ? 'bg-red-600 text-white' 
                      : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                  }`}
                >
                  All ({totalSubmissions})
                </button>

                <button
                  onClick={() => setStatusFilter('pending')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
                    statusFilter === 'pending' 
                      ? 'bg-amber-600 text-white' 
                      : 'bg-slate-900 text-slate-400 hover:text-amber-400 border border-slate-800'
                  }`}
                >
                  Pending ({pendingCount})
                </button>

                <button
                  onClick={() => setStatusFilter('approved')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
                    statusFilter === 'approved' 
                      ? 'bg-emerald-600 text-white' 
                      : 'bg-slate-900 text-slate-400 hover:text-emerald-400 border border-slate-800'
                  }`}
                >
                  Approved ({approvedCount})
                </button>

                <button
                  onClick={() => setStatusFilter('declined')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
                    statusFilter === 'declined' 
                      ? 'bg-rose-600 text-white' 
                      : 'bg-slate-900 text-slate-400 hover:text-rose-400 border border-slate-800'
                  }`}
                >
                  Refused ({declinedCount})
                </button>

                <button
                  onClick={openAddModal}
                  className="px-3 py-1.5 bg-red-600 hover:bg-red-550 text-white text-xs font-bold rounded-lg transition active:scale-95 flex items-center gap-1 cursor-pointer"
                  title="Add new payment record manually"
                >
                  <Plus className="w-3.5 h-3.5" />
                  New Payment
                </button>

                <button 
                  onClick={() => fetchPayments()}
                  disabled={isLoading}
                  className="p-2 bg-slate-900 text-slate-400 hover:text-slate-200 rounded-lg border border-slate-800 transition active:scale-95 disabled:opacity-50"
                  title="Refresh list"
                >
                  <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-red-500' : ''}`} />
                </button>
              </div>

            </div>

            {/* API error alert if any */}
            {apiError && (
              <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 p-4 rounded-xl text-xs flex items-center gap-2">
                <XCircle className="w-5 h-5 shrink-0 text-rose-500" />
                <span>{apiError}</span>
              </div>
            )}

            {/* List / Table of payment entries */}
            {isLoading && payments.length === 0 ? (
              <div className="text-center py-20 bg-slate-950 border border-slate-800 rounded-3xl space-y-3">
                <div className="w-8 h-8 border-2 border-red-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                <p className="text-sm text-slate-400 font-medium">Loading payments list...</p>
              </div>
            ) : filteredPayments.length === 0 ? (
              <div className="text-center py-20 bg-slate-950 border border-slate-800 rounded-3xl">
                <Filter className="w-10 h-10 text-slate-600 mx-auto mb-3" />
                <h4 className="text-base font-bold text-slate-300">No payment details found</h4>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  There are no payment records under the selected filter or no search query matched.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                
                {/* Desktop view: Structured Grid Table */}
                <div className="hidden lg:block bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead className="bg-slate-900 border-b border-slate-800 text-slate-400 uppercase font-bold text-[10px] tracking-wider">
                      <tr>
                        <th className="px-5 py-4">Date</th>
                        <th className="px-5 py-4">Student Info</th>
                        <th className="px-5 py-4">Selected Plan</th>
                        <th className="px-5 py-4">Sender Phone</th>
                        <th className="px-5 py-4">TrxID</th>
                        <th className="px-5 py-4 text-center">Status</th>
                        <th className="px-5 py-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800 text-slate-300">
                      {filteredPayments.map((p) => (
                        <tr key={p.id} className="hover:bg-slate-900/50 transition">
                          
                          {/* Date timestamp */}
                          <td className="px-5 py-4 whitespace-nowrap">
                            <div className="font-semibold text-slate-300">
                              {new Date(p.timestamp).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                              })}
                            </div>
                            <div className="text-[10px] text-slate-500 font-mono mt-1">
                              {new Date(p.timestamp).toLocaleTimeString('en-US', {
                                hour: '2-digit',
                                minute: '2-digit',
                                hour12: true
                              })}
                            </div>
                          </td>

                          {/* Student Details */}
                          <td className="px-5 py-4">
                            <div className="font-bold text-sm text-white">{p.studentName}</div>
                            <div className="text-[11px] text-slate-500 mt-0.5">{p.studentEmail}</div>
                          </td>

                          {/* Plan and Price */}
                          <td className="px-5 py-4 whitespace-nowrap">
                            <span className="text-white font-semibold text-xs py-0.5 px-2.5 rounded bg-slate-800 leading-tight">
                              {p.planName}
                            </span>
                            <div className="text-amber-500 font-bold font-sans mt-1">{p.planPrice}</div>
                          </td>

                          {/* Sender Phone */}
                          <td className="px-5 py-4 whitespace-nowrap">
                            <a 
                              href={`tel:${p.phone}`} 
                              className="inline-flex items-center gap-1 text-slate-300 hover:text-white hover:underline font-mono"
                            >
                              <PhoneCall className="w-3 h-3 text-slate-500" />
                              {p.phone}
                            </a>
                          </td>

                          {/* Transaction ID */}
                          <td className="px-5 py-4 whitespace-nowrap">
                            <div className="text-red-400 font-extrabold font-mono text-sm tracking-wider bg-slate-900 border border-slate-800 rounded px-2.5 py-1 select-all w-max uppercase">
                              {p.transactionId}
                            </div>
                          </td>

                          {/* Status Badge */}
                          <td className="px-5 py-4 whitespace-nowrap text-center">
                            {getStatusBadge(p.status)}
                          </td>

                          {/* Quick Admin Action Controls */}
                          <td className="px-5 py-4 whitespace-nowrap text-right">
                            {isUpdatingId === p.id ? (
                              <div className="w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin ml-auto"></div>
                            ) : (
                              <div className="inline-flex items-center gap-2">
                                {p.status !== 'approved' && (
                                  <button 
                                    onClick={() => handleStatusChange(p.id, 'approved')}
                                    className="px-2.5 py-1.5 bg-emerald-600/10 text-emerald-400 hover:bg-emerald-600 hover:text-white text-xs font-bold rounded-lg border border-emerald-500/20 transition cursor-pointer"
                                    title="Approve payment"
                                  >
                                    Approve ✅
                                  </button>
                                )}
                                {p.status !== 'declined' && (
                                  <button 
                                    onClick={() => handleStatusChange(p.id, 'declined')}
                                    className="px-2.5 py-1.5 bg-rose-600/10 text-rose-400 hover:bg-rose-600 hover:text-white text-xs font-bold rounded-lg border border-rose-500/20 transition cursor-pointer"
                                    title="Reject payment"
                                  >
                                    Reject ❌
                                  </button>
                                )}
                                {p.status !== 'pending' && (
                                  <button 
                                    onClick={() => handleStatusChange(p.id, 'pending')}
                                    className="p-1 px-1.5 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 text-[10px] font-semibold rounded border border-slate-800 transition cursor-pointer"
                                    title="Mark pending"
                                  >
                                    Mark Pending
                                  </button>
                                )}

                                {/* Complete Edit and Delete controls */}
                                <button 
                                  onClick={() => openEditModal(p)}
                                  className="p-1.5 bg-slate-800 hover:bg-blue-600 hover:text-white text-slate-400 rounded-lg border border-slate-700 transition cursor-pointer"
                                  title="Edit record"
                                >
                                  <Edit className="w-3.5 h-3.5" />
                                </button>

                                {isDeletingId === p.id ? (
                                  <div className="w-4 h-4 border-2 border-rose-500 border-t-transparent rounded-full animate-spin"></div>
                                ) : (
                                  <button 
                                    onClick={() => handleDeletePayment(p.id)}
                                    className="p-1.5 bg-slate-800 hover:bg-rose-600 hover:text-white text-slate-500 hover:text-white rounded-lg border border-slate-700 transition cursor-pointer"
                                    title="Delete record"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                )}
                              </div>
                            )}
                          </td>

                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile / Tablet view: Stacked Elegant Cards */}
                <div className="grid md:grid-cols-2 gap-4 lg:hidden">
                  {filteredPayments.map((p) => (
                    <div key={p.id} className="bg-slate-950 border border-slate-850 p-5 rounded-2xl space-y-4 hover:border-slate-700 transition">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="text-[10px] text-slate-500 font-semibold font-mono">
                            {new Date(p.timestamp).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })} • {new Date(p.timestamp).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                          </div>
                          <h4 className="text-base font-bold text-white mt-1">{p.studentName}</h4>
                          <span className="text-xs text-slate-500">{p.studentEmail}</span>
                        </div>
                        {getStatusBadge(p.status)}
                      </div>

                      <div className="h-px bg-slate-900"></div>

                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div>
                          <span className="text-slate-500 block">Plan</span>
                          <span className="text-slate-300 font-bold">{p.planName}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 block">Price</span>
                          <span className="text-amber-500 font-extrabold font-sans">{p.planPrice}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 block">Sender Phone</span>
                          <a href={`tel:${p.phone}`} className="text-slate-300 font-mono flex items-center gap-1 hover:underline">
                            <PhoneCall className="w-3 h-3 text-slate-500" />
                            {p.phone}
                          </a>
                        </div>
                        <div>
                          <span className="text-slate-500 block">TrxID</span>
                          <span className="text-red-400 font-extrabold font-mono select-all uppercase">{p.transactionId}</span>
                        </div>
                      </div>

                      <div className="h-px bg-slate-900"></div>

                      <div className="flex justify-between items-center gap-2 flex-wrap">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-[10px] text-slate-500 font-mono">ID: {p.id}</span>
                          <button 
                            onClick={() => openEditModal(p)}
                            className="p-1.5 bg-slate-900 border border-slate-800 hover:bg-blue-600 hover:text-white text-slate-400 rounded transition text-xs flex items-center gap-1 cursor-pointer"
                            title="Edit record"
                          >
                            <Edit className="w-3 h-3" />
                          </button>
                          {isDeletingId === p.id ? (
                            <div className="w-4 h-4 border-2 border-rose-500 border-t-transparent rounded-full animate-spin"></div>
                          ) : (
                            <button 
                              onClick={() => handleDeletePayment(p.id)}
                              className="p-1.5 bg-slate-900 border border-slate-800 hover:bg-rose-600 hover:text-white text-slate-500 hover:text-white rounded transition text-xs flex items-center gap-1 cursor-pointer"
                              title="Delete record"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                        
                        {isUpdatingId === p.id ? (
                          <div className="w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                          <div className="flex gap-1">
                            {p.status !== 'approved' && (
                              <button 
                                onClick={() => handleStatusChange(p.id, 'approved')}
                                className="px-2 py-1 bg-emerald-600/10 text-emerald-400 hover:bg-emerald-600 hover:text-white text-[11px] font-bold rounded border border-emerald-500/20 cursor-pointer"
                              >
                                Approve ✓
                              </button>
                            )}
                            {p.status !== 'declined' && (
                              <button 
                                onClick={() => handleStatusChange(p.id, 'declined')}
                                className="px-2 py-1 bg-rose-600/10 text-rose-400 hover:bg-rose-600 hover:text-white text-[11px] font-bold rounded border border-rose-500/20 cursor-pointer"
                              >
                                Reject ✕
                              </button>
                            )}
                            {p.status !== 'pending' && (
                              <button 
                                onClick={() => handleStatusChange(p.id, 'pending')}
                                className="px-1.5 py-1 bg-slate-900 text-slate-400 text-[10px] font-semibold rounded border border-slate-800 cursor-pointer"
                              >
                                Pending
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            )}

          </div>
        )}

      </main>

      {/* Footer Branding Credit */}
      <footer className="bg-slate-950 border-t border-slate-800 py-4 text-center text-xs text-slate-500 font-sans mt-auto">
        <p>© {new Date().getFullYear()} IELTS REVOLUTION Administration Panel. All Rights Reserved.</p>
      </footer>

      {/* ADD / CREATE PAYMENT MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-805 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl animate-scaleIn">
            <div className="p-5 bg-slate-950 border-b border-slate-800 flex justify-between items-center">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Plus className="w-4 h-4 text-red-500" /> Add New Payment Record
              </h3>
              <button 
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-white transition font-bold text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreatePayment} className="p-5 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-[11px] font-bold text-slate-400">Student Name (English)</label>
                  <input 
                    type="text" 
                    required 
                    value={formName} 
                    onChange={e => setFormName(e.target.value)}
                    placeholder="e.g. Abir Rahman"
                    className="w-full text-xs px-3 py-2 bg-slate-950 border border-slate-850 rounded-lg focus:outline-none focus:border-red-500 text-slate-100"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-[11px] font-bold text-slate-400">Your Name (Bangla field)</label>
                  <input 
                    type="text" 
                    value={formNameBangla} 
                    onChange={e => setFormNameBangla(e.target.value)}
                    placeholder="e.g. আবির রহমান"
                    className="w-full text-xs px-3 py-2 bg-slate-950 border border-slate-850 rounded-lg focus:outline-none focus:border-red-500 text-slate-100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-[11px] font-bold text-slate-400">Mobile Number (Phone)</label>
                  <input 
                    type="tel" 
                    required 
                    value={formPhone} 
                    onChange={e => setFormPhone(e.target.value)}
                    placeholder="e.g. 01712345678"
                    className="w-full text-xs px-3 py-2 bg-slate-950 border border-slate-850 rounded-lg focus:outline-none focus:border-red-500 text-slate-100 font-mono"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-[11px] font-bold text-slate-400">Email Address (Email)</label>
                  <input 
                    type="email" 
                    value={formEmail} 
                    onChange={e => setFormEmail(e.target.value)}
                    placeholder="e.g. student@gmail.com"
                    className="w-full text-xs px-3 py-2 bg-slate-950 border border-slate-850 rounded-lg focus:outline-none focus:border-red-500 text-slate-100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-[11px] font-bold text-slate-400">Transaction ID (TrxID)</label>
                  <input 
                    type="text" 
                    required 
                    value={formTransactionId} 
                    onChange={e => setFormTransactionId(e.target.value)}
                    placeholder="e.g. BKX837D92"
                    className="w-full text-xs px-3 py-2 bg-slate-950 border border-slate-850 rounded-lg focus:outline-none focus:border-red-500 text-slate-100 font-mono uppercase"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-[11px] font-bold text-slate-400">Status</label>
                  <select 
                    value={formStatus} 
                    onChange={e => setFormStatus(e.target.value as any)}
                    className="w-full text-xs px-3 py-2 bg-slate-950 border border-slate-850 rounded-lg focus:outline-none focus:border-red-500 text-slate-100"
                  >
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="declined">Declined</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-[11px] font-bold text-slate-400">Course Plan Name</label>
                  <input 
                    type="text" 
                    required 
                    value={formPlanName} 
                    onChange={e => setFormPlanName(e.target.value)}
                    placeholder="Premium Live Batch"
                    className="w-full text-xs px-3 py-2 bg-slate-950 border border-slate-850 rounded-lg focus:outline-none focus:border-red-500 text-slate-100"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-[11px] font-bold text-slate-400">Course Fee</label>
                  <input 
                    type="text" 
                    required 
                    value={formPlanPrice} 
                    onChange={e => setFormPlanPrice(e.target.value)}
                    placeholder="৳ 2,999"
                    className="w-full text-xs px-3 py-2 bg-slate-950 border border-slate-850 rounded-lg focus:outline-none focus:border-red-500 text-slate-100 font-sans"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
                <button 
                  type="button" 
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-bold transition cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={isSaving}
                  className="px-5 py-2 bg-red-650 hover:bg-red-600 text-white rounded-lg text-xs font-bold transition flex items-center justify-center gap-1 cursor-pointer"
                >
                  {isSaving ? <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span> : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT / UPDATE PAYMENT MODAL */}
      {showEditModal && editingRecord && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-805 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl animate-scaleIn">
            <div className="p-5 bg-slate-950 border-b border-slate-800 flex justify-between items-center">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Edit className="w-4 h-4 text-blue-500" /> Edit Payment Details
              </h3>
              <button 
                onClick={() => {
                  setShowEditModal(false);
                  setEditingRecord(null);
                }}
                className="text-slate-400 hover:text-white transition font-bold text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleUpdatePayment} className="p-5 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-[11px] font-bold text-slate-400">Student Name (English)</label>
                  <input 
                    type="text" 
                    required 
                    value={formName} 
                    onChange={e => setFormName(e.target.value)}
                    className="w-full text-xs px-3 py-2 bg-slate-950 border border-slate-850 rounded-lg focus:outline-none focus:border-red-500 text-slate-100"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-[11px] font-bold text-slate-400">Your Name (Bangla field)</label>
                  <input 
                    type="text" 
                    value={formNameBangla} 
                    onChange={e => setFormNameBangla(e.target.value)}
                    className="w-full text-xs px-3 py-2 bg-slate-950 border border-slate-850 rounded-lg focus:outline-none focus:border-red-500 text-slate-100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-[11px] font-bold text-slate-400">Mobile Number (Phone)</label>
                  <input 
                    type="tel" 
                    required 
                    value={formPhone} 
                    onChange={e => setFormPhone(e.target.value)}
                    className="w-full text-xs px-3 py-2 bg-slate-950 border border-slate-850 rounded-lg focus:outline-none focus:border-red-500 text-slate-100 font-mono"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-[11px] font-bold text-slate-400">Email Address (Email)</label>
                  <input 
                    type="email" 
                    value={formEmail} 
                    onChange={e => setFormEmail(e.target.value)}
                    className="w-full text-xs px-3 py-2 bg-slate-950 border border-slate-850 rounded-lg focus:outline-none focus:border-red-500 text-slate-100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-[11px] font-bold text-slate-400">Transaction ID (TrxID)</label>
                  <input 
                    type="text" 
                    required 
                    value={formTransactionId} 
                    onChange={e => setFormTransactionId(e.target.value)}
                    className="w-full text-xs px-3 py-2 bg-slate-950 border border-slate-850 rounded-lg focus:outline-none focus:border-red-500 text-slate-100 font-mono uppercase"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-[11px] font-bold text-slate-400">Status</label>
                  <select 
                    value={formStatus} 
                    onChange={e => setFormStatus(e.target.value as any)}
                    className="w-full text-xs px-3 py-2 bg-slate-950 border border-slate-850 rounded-lg focus:outline-none focus:border-red-500 text-slate-100"
                  >
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="declined">Declined</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-[11px] font-bold text-slate-400">Course Plan Name</label>
                  <input 
                    type="text" 
                    required 
                    value={formPlanName} 
                    onChange={e => setFormPlanName(e.target.value)}
                    className="w-full text-xs px-3 py-2 bg-slate-950 border border-slate-850 rounded-lg focus:outline-none focus:border-red-500 text-slate-100"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-[11px] font-bold text-slate-400">Course Fee</label>
                  <input 
                    type="text" 
                    required 
                    value={formPlanPrice} 
                    onChange={e => setFormPlanPrice(e.target.value)}
                    className="w-full text-xs px-3 py-2 bg-slate-950 border border-slate-850 rounded-lg focus:outline-none focus:border-red-500 text-slate-100 font-sans"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
                <button 
                  type="button" 
                  onClick={() => {
                    setShowEditModal(false);
                    setEditingRecord(null);
                  }}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-bold transition cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={isSaving}
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-550 text-white rounded-lg text-xs font-bold transition flex items-center justify-center gap-1 cursor-pointer"
                >
                  {isSaving ? <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span> : 'Update'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
    </div>
  );
};
