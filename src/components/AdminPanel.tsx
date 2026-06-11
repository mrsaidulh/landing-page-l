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
  const [comfortTheme, setComfortTheme] = useState<'slate' | 'sepia' | 'sage'>('slate');

  useEffect(() => {
    const saved = localStorage.getItem('admin_comfort_theme') as 'slate' | 'sepia' | 'sage';
    if (saved && ['slate', 'sepia', 'sage'].includes(saved)) {
      setComfortTheme(saved);
    }
  }, []);

  const handleThemeChange = (newTheme: 'slate' | 'sepia' | 'sage') => {
    setComfortTheme(newTheme);
    localStorage.setItem('admin_comfort_theme', newTheme);
  };

  const themeStyles = {
    slate: {
      root: "bg-[#0b0f19] text-slate-300",
      header: "bg-[#141b2d] border-b border-slate-800/60",
      card: "bg-[#141b2d] border border-slate-800/60",
      cardNoBorders: "bg-[#141b2d]",
      textTitle: "text-white",
      textMuted: "text-slate-400",
      textSubTitle: "text-xs text-slate-400",
      borderAccent: "border-l-4 border-l-amber-500/80",
      input: "bg-slate-900/60 border border-slate-800 text-slate-100 placeholder:text-slate-500 focus:border-indigo-500/60",
      buttonSecondary: "bg-[#0b0f19] border border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white",
      pillActive: "bg-indigo-650 text-white shadow-md border-transparent",
      pillInactive: "bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800/50",
      tableHeader: "bg-[#18233c] text-slate-400 border-b border-slate-800/60",
      tableRowDivider: "divide-y divide-slate-800/60",
      tableRowHover: "hover:bg-slate-900/30",
      trxBg: "bg-slate-900/60 border border-slate-800/60 text-teal-400 font-extrabold",
      badgePending: "text-amber-400 bg-amber-500/10 border border-amber-500/20",
      badgeApproved: "text-emerald-400 bg-emerald-500/10 border border-emerald-500/20",
      badgeDeclined: "text-rose-400 bg-rose-500/10 border border-rose-500/20",
      modalBg: "bg-[#141b2d] border border-slate-800/80",
      modalHeader: "bg-slate-900/40 border-b border-slate-800/60",
      modalFooter: "border-t border-slate-800/60",
      footer: "bg-[#141b2d] border-t border-slate-800/60 text-slate-500"
    },
    sepia: {
      root: "bg-[#f5efe4] text-[#4d4538]",
      header: "bg-[#eae2cf] border-b border-[#dacfae]",
      card: "bg-[#eae2cf] border border-[#dacfae]",
      cardNoBorders: "bg-[#eae2cf]",
      textTitle: "text-[#2b251a]",
      textMuted: "text-[#7a6f58]",
      textSubTitle: "text-xs text-[#7a6f58]",
      borderAccent: "border-l-4 border-l-[#caa87a]",
      input: "bg-[#faf7f0] border border-[#dacfae] text-[#2b251a] placeholder-[#9c9078] focus:border-[#a67c48]",
      buttonSecondary: "bg-[#f5efe4] border border-[#dacfae] text-[#554a3a] hover:bg-[#eae2cf] hover:text-[#2b251a]",
      pillActive: "bg-[#ab8452] text-white shadow-md border-transparent",
      pillInactive: "bg-[#faf7f0] text-[#7a6f58] hover:text-[#2b251a] border border-[#dacfae]",
      tableHeader: "bg-[#decfae] text-[#554a3a] border-b border-[#cdbda2]",
      tableRowDivider: "divide-y divide-[#dacfae]",
      tableRowHover: "hover:bg-[#eae2cf]/55",
      trxBg: "bg-[#faf7f0] border border-[#dacfae] text-[#8e5c1d] font-bold",
      badgePending: "text-[#aa6612] bg-[#fdfaf2] border border-[#e8caa2]",
      badgeApproved: "text-[#1e6b36] bg-[#eef7f0] border border-[#bee2c9]",
      badgeDeclined: "text-[#b22a27] bg-[#fdf4f4] border border-[#f5c2c2]",
      modalBg: "bg-[#eae2cf] border border-[#dacfae]",
      modalHeader: "bg-[#decfae]/40 border-b border-[#dacfae]",
      modalFooter: "border-t border-[#dacfae]",
      footer: "bg-[#eae2cf] border-t border-[#dacfae] text-[#7a6f58]"
    },
    sage: {
      root: "bg-[#0b100d] text-[#add4be]",
      header: "bg-[#131b17] border-b border-[#1f2d26]",
      card: "bg-[#131b17] border border-[#1f2d26]",
      cardNoBorders: "bg-[#131b17]",
      textTitle: "text-[#d1edd9]",
      textMuted: "text-[#628c74]",
      textSubTitle: "text-xs text-[#628c74]",
      borderAccent: "border-l-4 border-l-[#3a7356]/80",
      input: "bg-[#0f1412] border border-[#1f2d26] text-[#d1edd9] placeholder-[#385945] focus:border-[#48996b]/60",
      buttonSecondary: "bg-[#0b100d] border border-[#1f2d26] text-[#add4be] hover:bg-[#1a2520] hover:text-white",
      pillActive: "bg-[#2d5c43] text-white shadow-md border-transparent",
      pillInactive: "bg-[#0f1412] text-[#628c74] hover:text-[#add4be] border border-[#1f2d26]",
      tableHeader: "bg-[#1a2520] text-[#7eb393] border-b border-[#1f2d26]",
      tableRowDivider: "divide-y divide-[#1f2d26]",
      tableRowHover: "hover:bg-[#1a2520]/40",
      trxBg: "bg-[#0f1412] border border-[#1f2d26] text-[#42b87f] font-bold",
      badgePending: "text-amber-300 bg-amber-500/10 border border-amber-500/20",
      badgeApproved: "text-emerald-300 bg-emerald-500/15 border border-emerald-500/20",
      badgeDeclined: "text-rose-300 bg-rose-500/10 border border-rose-500/20",
      modalBg: "bg-[#131b17] border border-[#1f2d26]",
      modalHeader: "bg-[#1a2520]/40 border-b border-[#1f2d26]",
      modalFooter: "border-t border-[#1f2d26]",
      footer: "bg-[#131b17] border-t border-[#1f2d26] text-[#4a6b57]"
    }
  };

  const activeTheme = themeStyles[comfortTheme];

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
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${activeTheme.badgeApproved}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Approved
          </span>
        );
      case 'declined':
        return (
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${activeTheme.badgeDeclined}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
            Refused
          </span>
        );
      default:
        return (
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${activeTheme.badgePending}`}>
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
    <div className={`min-h-screen ${activeTheme.root} flex flex-col font-sans transition-all duration-300`} id="admin-root">
      
      {/* Top Admin Header Bar */}
      <header className={`${activeTheme.header} px-6 py-4 flex flex-wrap justify-between items-center gap-4 transition-all duration-300`}>
        <div className="flex items-center gap-3">
          <div className="bg-slate-800/10 p-2 rounded-lg text-indigo-400 border border-slate-700/20">
            <Lock className="w-5 h-5 text-indigo-400" />
          </div>
          <div>
            <h1 className="text-lg md:text-xl font-bold tracking-tight text-white flex items-center gap-2">
              <span className={activeTheme.textTitle}>IELTS Revolution</span> <span className="text-indigo-400 text-xs px-2 py-0.5 bg-indigo-500/10 rounded border border-indigo-500/20">Admin Base</span>
            </h1>
            <p className={`text-xs ${activeTheme.textMuted}`}>Enrollment & Payment Verification Window</p>
          </div>
        </div>
        
        <div className="flex items-center flex-wrap gap-3">
          {/* Eye Comfort Mode Indicator */}
          <div className="flex items-center gap-1 bg-black/10 p-1 rounded-lg border border-slate-800/20">
            <span className={`text-[9px] uppercase font-bold tracking-wider px-2 ${activeTheme.textMuted} hidden sm:inline`}>👁️ eye comfort:</span>
            <button
              onClick={() => handleThemeChange('slate')}
              className={`px-2 py-1 rounded text-[10px] font-bold transition-all ${comfortTheme === 'slate' ? 'bg-indigo-600 text-white shadow-sm' : `${activeTheme.textMuted} hover:text-indigo-450`}`}
              title="Soothing Slate Dark"
            >
              Slate
            </button>
            <button
              onClick={() => handleThemeChange('sepia')}
              className={`px-2 py-1 rounded text-[10px] font-bold transition-all ${comfortTheme === 'sepia' ? 'bg-[#ab8452] text-white shadow-sm' : `${activeTheme.textMuted} hover:text-[#2b251a]`}`}
              title="Warm Sepia Soft"
            >
              Sepia
            </button>
            <button
              onClick={() => handleThemeChange('sage')}
              className={`px-2 py-1 rounded text-[10px] font-bold transition-all ${comfortTheme === 'sage' ? 'bg-emerald-700 text-white shadow-sm' : `${activeTheme.textMuted} hover:text-emerald-400`}`}
              title="Calming Sage"
            >
              Sage
            </button>
          </div>

          <button 
            onClick={onClose}
            className={`flex items-center gap-1 px-3.5 py-1.5 rounded-lg border ${activeTheme.buttonSecondary} text-xs font-medium transition cursor-pointer`}
          >
            <ArrowLeft className="w-3.5 h-3.5 text-indigo-400" />
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
            <div className={`${activeTheme.card} rounded-2xl p-6 md:p-8 shadow-2xl relative transition-all duration-300`}>
              <div className="text-center space-y-2 mb-6">
                <div className="inline-flex p-3 rounded-full bg-indigo-500/10 border border-indigo-505/20 text-indigo-400 mb-2">
                  <Lock className="w-6 h-6" />
                </div>
                <h2 className={`text-xl font-extrabold ${activeTheme.textTitle}`}>Admin Login Portal</h2>
                <p className={`text-xs ${activeTheme.textMuted}`}>Please login to verify and approve payments</p>
                
                {/* Auto Fill Quick Button */}
                <div className="pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      setUsername('admin');
                      setPassword('admin123');
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-200 bg-slate-800/70 hover:bg-slate-750 active:scale-95 transition-all text-center cursor-pointer border border-slate-700/30"
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
                  <label className={`block text-xs font-bold ${activeTheme.textMuted}`}>Username</label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-slate-500">
                      <User className="w-4 h-4" />
                    </span>
                    <input 
                      type="text"
                      className={`w-full pl-9 pr-4 py-2.5 ${activeTheme.input} rounded-lg text-sm transition-all font-mono`}
                      placeholder="Enter Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className={`block text-xs font-bold ${activeTheme.textMuted}`}>Password</label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-slate-550">
                      <Lock className="w-4 h-4" />
                    </span>
                    <input 
                      type={showPassword ? "text" : "password"}
                      className={`w-full pl-9 pr-10 py-2.5 ${activeTheme.input} rounded-lg text-sm transition-all font-mono`}
                      placeholder="Enter Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-slate-500 hover:text-slate-350"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button 
                  type="submit"
                  disabled={isLoggingIn}
                  className="w-full bg-indigo-650 hover:bg-indigo-600 disabled:bg-slate-800 text-white font-bold py-3 rounded-lg text-xs tracking-wider uppercase transition shadow-lg mt-4 flex items-center justify-center gap-1.5 cursor-pointer"
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

              <div className={`mt-8 border-t ${activeTheme.border} pt-4 text-center space-y-1`}>
                <p className={`text-[10px] ${activeTheme.textMuted} font-medium`}>Quick Login: admin / admin123</p>
                <p className={`text-[9px] ${activeTheme.textMuted} font-mono opacity-80`}>Environment Credentials: administrator / Maailulp1$%</p>
              </div>
            </div>
          </div>
        ) : (
          /* Logged In Admin Dashboard */
          <div className="space-y-6">
            
            {/* Business Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              
              <div className={`${activeTheme.card} rounded-2xl p-4 md:p-5 flex flex-col justify-between transition-all duration-300`}>
                <span className={`${activeTheme.textMuted} text-xs font-semibold`}>Total Revenue (Approved)</span>
                <div className="flex items-baseline mt-2 gap-1 flex-wrap">
                  <span className={`text-2xl md:text-3xl font-extrabold ${comfortTheme === 'sepia' ? 'text-[#8e5c1d]' : 'text-amber-400'} font-sans`}>৳ {approvedRevenue.toLocaleString('en-US')}</span>
                </div>
                <span className="text-[10px] text-[rgba(52,211,153,0.95)] font-bold mt-1">✓ {approvedCount} Payments Verified</span>
              </div>

              <div className={`${activeTheme.card} rounded-2xl p-4 md:p-5 flex flex-col justify-between transition-all duration-300`}>
                <span className={`${activeTheme.textMuted} text-xs font-semibold`}>Total Requests</span>
                <div className="flex items-baseline mt-2">
                  <span className={`text-2xl md:text-3xl font-extrabold ${activeTheme.textTitle} font-mono`}>{totalSubmissions}</span>
                </div>
                <span className={`text-[10px] ${activeTheme.textMuted} mt-1 opacity-70`}>End-user submissions in list</span>
              </div>

              <div className={`${activeTheme.card} ${activeTheme.borderAccent} rounded-2xl p-4 md:p-5 flex flex-col justify-between transition-all duration-300`}>
                <span className={`${activeTheme.textMuted} text-xs font-semibold`}>Pending Verification</span>
                <div className="flex items-baseline mt-2">
                  <span className={`text-2xl md:text-3xl font-extrabold ${comfortTheme === 'sepia' ? 'text-[#ab8452]' : 'text-amber-400'} font-mono`}>{pendingCount}</span>
                </div>
                <span className={`text-[10px] ${comfortTheme === 'sepia' ? 'text-[#ab8452]' : 'text-amber-400/90'} font-medium mt-1 animate-pulse`}>● Awaiting check</span>
              </div>

              <div className={`${activeTheme.card} rounded-2xl p-4 md:p-5 flex flex-col justify-between transition-all duration-300`}>
                <span className={`${activeTheme.textMuted} text-xs font-semibold`}>Rejected Requests</span>
                <div className="flex items-baseline mt-2">
                  <span className={`text-2xl md:text-3xl font-extrabold ${comfortTheme === 'sepia' ? 'text-[#b22a27]' : 'text-rose-450/90'} font-mono`}>{declinedCount}</span>
                </div>
                <span className={`text-[10px] ${activeTheme.textMuted} mt-1 opacity-70`}>Trash/Fake TxID filter info</span>
              </div>

            </div>

            {/* Main Action Bar, Filter and Searches */}
            <div className={`${activeTheme.card} rounded-2xl p-4 flex flex-col md:flex-row justify-between items-center gap-4 transition-all duration-300`}>
              
              {/* Left Search input */}
              <div className="relative w-full md:max-w-md">
                <span className="absolute left-3 top-2.5 text-slate-500">
                  <Search className="w-4 h-4" />
                </span>
                <input 
                  type="text"
                  placeholder="Search by name, phone or TrxID..."
                  className={`w-full pl-9 pr-4 py-2 ${activeTheme.input} rounded-lg text-xs placeholder:text-slate-500 focus:outline-none transition-all`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Right Filter status options */}
              <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-end">
                <span className={`text-xs ${activeTheme.textMuted} font-semibold mr-1 flex items-center gap-1`}>
                  <Filter className="w-3.5 h-3.5" />
                  Filter Status:
                </span>
                
                <button
                  onClick={() => setStatusFilter('all')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    statusFilter === 'all' 
                      ? activeTheme.pillActive
                      : activeTheme.pillInactive
                  }`}
                >
                  All ({totalSubmissions})
                </button>

                <button
                  onClick={() => setStatusFilter('pending')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                    statusFilter === 'pending' 
                      ? (comfortTheme === 'sepia' ? 'bg-[#ab8452] text-white shadow-md' : 'bg-amber-600/90 text-white shadow-md')
                      : activeTheme.pillInactive
                  }`}
                >
                  Pending ({pendingCount})
                </button>

                <button
                  onClick={() => setStatusFilter('approved')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                    statusFilter === 'approved' 
                      ? (comfortTheme === 'sepia' ? 'bg-[#1e6b36] text-white shadow-md' : 'bg-emerald-650 text-white shadow-md')
                      : activeTheme.pillInactive
                  }`}
                >
                  Approved ({approvedCount})
                </button>

                <button
                  onClick={() => setStatusFilter('declined')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                    statusFilter === 'declined' 
                      ? (comfortTheme === 'sepia' ? 'bg-[#b22a27] text-white shadow-md' : 'bg-rose-650 text-white shadow-md')
                      : activeTheme.pillInactive
                  }`}
                >
                  Refused ({declinedCount})
                </button>

                <button
                  onClick={openAddModal}
                  className={`px-3 py-1.5 ${comfortTheme === 'sepia' ? 'bg-[#ab8452] hover:bg-[#a67c48]' : 'bg-indigo-600 hover:bg-indigo-550'} text-white text-xs font-bold rounded-lg transition active:scale-95 flex items-center gap-1 cursor-pointer shadow-md`}
                  title="Add new payment record manually"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Payment
                </button>

                <button 
                  onClick={() => fetchPayments()}
                  disabled={isLoading}
                  className="p-2 bg-black/10 hover:bg-black/20 text-slate-400 hover:text-slate-205 rounded-lg border border-slate-705/10 transition active:scale-95 disabled:opacity-50"
                  title="Refresh list"
                >
                  <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-indigo-400' : ''}`} />
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
              <div className={`text-center py-20 ${activeTheme.card} border ${activeTheme.border} rounded-3xl space-y-3`}>
                <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                <p className={`text-sm ${activeTheme.textMuted} font-medium`}>Loading payments list...</p>
              </div>
            ) : filteredPayments.length === 0 ? (
              <div className={`text-center py-20 ${activeTheme.card} border ${activeTheme.border} rounded-3xl`}>
                <Filter className="w-10 h-10 text-slate-600 mx-auto mb-3" />
                <h4 className={`text-base font-bold ${activeTheme.textTitle}`}>No payment details found</h4>
                <p className={`text-xs ${activeTheme.textMuted} mt-1 max-w-sm mx-auto`}>
                  There are no payment records under the selected filter or no search query matched.
                </p>
              </div>
            ) : (
              <div className="space-y-4 font-sans">
                
                {/* Desktop view: Structured Grid Table */}
                <div className={`hidden lg:block ${activeTheme.card} border ${activeTheme.border} rounded-2xl overflow-hidden`}>
                  <table className="w-full text-left text-xs border-collapse">
                    <thead className={`${activeTheme.tableHeader} border-b ${activeTheme.border} ${activeTheme.textMuted} uppercase font-bold text-[10px] tracking-wider`}>
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
                    <tbody className={`divide-y ${activeTheme.border} ${activeTheme.textTitle}`}>
                      {filteredPayments.map((p) => (
                        <tr key={p.id} className={`${activeTheme.tableRow} transition`}>
                          
                          {/* Date timestamp */}
                          <td className="px-5 py-4 whitespace-nowrap">
                            <div className={`font-semibold ${activeTheme.textTitle}`}>
                              {new Date(p.timestamp).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                              })}
                            </div>
                            <div className={`text-[10px] ${activeTheme.textMuted} font-mono mt-1`}>
                              {new Date(p.timestamp).toLocaleTimeString('en-US', {
                                hour: '2-digit',
                                minute: '2-digit',
                                hour12: true
                              })}
                            </div>
                          </td>

                          {/* Student Details */}
                          <td className="px-5 py-4">
                            <div className={`font-bold text-sm ${activeTheme.textTitle}`}>{p.studentName}</div>
                            <div className={`text-[11px] ${activeTheme.textMuted} mt-0.5`}>{p.studentEmail}</div>
                          </td>

                          {/* Plan and Price */}
                          <td className="px-5 py-4 whitespace-nowrap">
                            <span className={`font-semibold text-xs py-0.5 px-2.5 rounded ${activeTheme.badgePlan} leading-tight border border-slate-700/10`}>
                              {p.planName}
                            </span>
                            <div className="text-amber-500 font-bold font-sans mt-0.5">{p.planPrice}</div>
                          </td>

                          {/* Sender Phone */}
                          <td className="px-5 py-4 whitespace-nowrap font-mono">
                            <a 
                              href={`tel:${p.phone}`} 
                              className={`inline-flex items-center gap-1 ${activeTheme.textTitle} hover:underline`}
                            >
                              <PhoneCall className={`w-3 h-3 ${activeTheme.textMuted}`} />
                              {p.phone}
                            </a>
                          </td>

                          {/* Transaction ID */}
                          <td className="px-5 py-4 whitespace-nowrap font-mono">
                            <div className={`text-teal-500 font-extrabold text-xs tracking-wider ${activeTheme.badgeTrx} border border-slate-800/10 rounded px-2.5 py-1 select-all w-max uppercase`}>
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
                              <div className="w-4 h-4 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin ml-auto"></div>
                            ) : (
                              <div className="inline-flex items-center gap-2">
                                {p.status !== 'approved' && (
                                  <button 
                                    onClick={() => handleStatusChange(p.id, 'approved')}
                                    className="px-2.5 py-1.5 bg-emerald-600/15 text-emerald-500 hover:bg-emerald-600 hover:text-white text-xs font-bold rounded-lg border border-emerald-500/20 transition cursor-pointer"
                                    title="Approve payment"
                                  >
                                    Approve ✅
                                  </button>
                                )}
                                {p.status !== 'declined' && (
                                  <button 
                                    onClick={() => handleStatusChange(p.id, 'declined')}
                                    className="px-2.5 py-1.5 bg-rose-600/15 text-rose-500 hover:bg-rose-650 hover:text-white text-xs font-bold rounded-lg border border-rose-500/20 transition cursor-pointer"
                                    title="Reject payment"
                                  >
                                    Reject ❌
                                  </button>
                                )}
                                {p.status !== 'pending' && (
                                  <button 
                                    onClick={() => handleStatusChange(p.id, 'pending')}
                                    className="p-1 px-1.5 bg-slate-805 hover:bg-slate-700 text-slate-350 hover:text-slate-100 text-[10px] font-semibold rounded border border-slate-700 transition cursor-pointer"
                                    title="Mark pending"
                                  >
                                    Mark Pending
                                  </button>
                                )}

                                {/* Complete Edit and Delete controls */}
                                <button 
                                  onClick={() => openEditModal(p)}
                                  className="p-1.5 bg-slate-810 hover:bg-indigo-650 hover:text-white text-slate-400 rounded-lg border border-slate-700/60 transition cursor-pointer"
                                  title="Edit record"
                                >
                                  <Edit className="w-3.5 h-3.5" />
                                </button>

                                {isDeletingId === p.id ? (
                                  <div className="w-4 h-4 border-2 border-rose-500 border-t-transparent rounded-full animate-spin"></div>
                                ) : (
                                  <button 
                                    onClick={() => handleDeletePayment(p.id)}
                                    className="p-1.5 bg-slate-810 hover:bg-rose-600 hover:text-white text-rose-505 rounded-lg border border-slate-700/60 transition cursor-pointer"
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
                    <div key={p.id} className={`${activeTheme.card} border ${activeTheme.border} p-5 rounded-2xl space-y-4 hover:border-slate-705/85 transition duration-300`}>
                      <div className="flex justify-between items-start">
                        <div>
                          <div className={`text-[10px] ${activeTheme.textMuted} font-semibold font-mono`}>
                            {new Date(p.timestamp).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })} • {new Date(p.timestamp).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                          </div>
                          <h4 className={`text-base font-bold ${activeTheme.textTitle} mt-1`}>{p.studentName}</h4>
                          <span className={`text-xs ${activeTheme.textMuted}`}>{p.studentEmail}</span>
                        </div>
                        {getStatusBadge(p.status)}
                      </div>

                      <div className={`h-px ${activeTheme.border} opacity-50`}></div>

                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div>
                          <span className={`${activeTheme.textMuted} block`}>Plan</span>
                          <span className={`${activeTheme.textTitle} font-bold`}>{p.planName}</span>
                        </div>
                        <div>
                          <span className={`${activeTheme.textMuted} block`}>Price</span>
                          <span className="text-amber-505 font-extrabold font-sans">{p.planPrice}</span>
                        </div>
                        <div>
                          <span className={`${activeTheme.textMuted} block`}>Sender Phone</span>
                          <a href={`tel:${p.phone}`} className={`${activeTheme.textTitle} font-mono flex items-center gap-1 hover:underline`}>
                            <PhoneCall className={`w-3 h-3 ${activeTheme.textMuted}`} />
                            {p.phone}
                          </a>
                        </div>
                        <div>
                          <span className={`${activeTheme.textMuted} block`}>TrxID</span>
                          <span className="text-teal-500 font-extrabold font-mono select-all uppercase">{p.transactionId}</span>
                        </div>
                      </div>

                      <div className={`h-px ${activeTheme.border} opacity-50`}></div>

                      <div className="flex justify-between items-center gap-2 flex-wrap">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className={`text-[10px] ${activeTheme.textMuted} font-mono`}>ID: {p.id}</span>
                          <button 
                            onClick={() => openEditModal(p)}
                            className="p-1.5 bg-black/10 hover:bg-black/20 text-slate-400 rounded transition text-xs flex items-center gap-1 cursor-pointer"
                            title="Edit record"
                          >
                            <Edit className="w-3 h-3" />
                          </button>
                          {isDeletingId === p.id ? (
                            <div className="w-4 h-4 border-2 border-rose-500 border-t-transparent rounded-full animate-spin"></div>
                          ) : (
                            <button 
                              onClick={() => handleDeletePayment(p.id)}
                              className="p-1.5 bg-black/10 hover:bg-rose-600 hover:text-white text-slate-500 hover:text-white rounded transition text-xs flex items-center gap-1 cursor-pointer"
                              title="Delete record"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                        
                        {isUpdatingId === p.id ? (
                          <div className="w-4 h-4 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                          <div className="flex gap-1">
                            {p.status !== 'approved' && (
                              <button 
                                onClick={() => handleStatusChange(p.id, 'approved')}
                                className="px-2 py-1 bg-emerald-600/15 text-emerald-500 hover:bg-emerald-600 hover:text-white text-[11px] font-bold rounded border border-emerald-500/20 cursor-pointer"
                              >
                                Approve ✓
                              </button>
                            )}
                            {p.status !== 'declined' && (
                              <button 
                                onClick={() => handleStatusChange(p.id, 'declined')}
                                className="px-2 py-1 bg-rose-600/15 text-rose-500 hover:bg-rose-650 hover:text-white text-[11px] font-bold rounded border border-rose-500/20 cursor-pointer"
                              >
                                Reject ✕
                              </button>
                            )}
                            {p.status !== 'pending' && (
                              <button 
                                onClick={() => handleStatusChange(p.id, 'pending')}
                                className="px-1.5 py-1 bg-slate-800 text-slate-400 text-[10px] font-semibold rounded border border-slate-700 cursor-pointer"
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
      <footer className={`${activeTheme.header} border-t ${activeTheme.border} py-4 text-center text-xs ${activeTheme.textMuted} font-sans mt-auto transition-all`}>
        <p>© {new Date().getFullYear()} IELTS REVOLUTION Administration Panel. All Rights Reserved.</p>
      </footer>

      {/* ADD / CREATE PAYMENT MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className={`${activeTheme.card} border ${activeTheme.border} rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl animate-scaleIn animate-fadeIn`}>
            <div className={`p-5 bg-black/10 border-b ${activeTheme.border} flex justify-between items-center`}>
              <h3 className={`text-sm font-bold ${activeTheme.textTitle} flex items-center gap-2`}>
                <Plus className="w-4 h-4 text-indigo-400" /> Add New Payment Record
              </h3>
              <button 
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-white transition font-bold text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreatePayment} className="p-5 space-y-4 font-sans">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className={`block text-[11px] font-bold ${activeTheme.textMuted}`}>Student Name (English)</label>
                  <input 
                    type="text" 
                    required 
                    value={formName} 
                    onChange={e => setFormName(e.target.value)}
                    placeholder="e.g. Abir Rahman"
                    className={`w-full text-xs px-3 py-2 ${activeTheme.input} rounded-lg text-slate-100 placeholder:text-slate-500`}
                  />
                </div>
                <div className="space-y-1">
                  <label className={`block text-[11px] font-bold ${activeTheme.textMuted}`}>Your Name (Bangla field)</label>
                  <input 
                    type="text" 
                    value={formNameBangla} 
                    onChange={e => setFormNameBangla(e.target.value)}
                    placeholder="e.g. আবির রহমান"
                    className={`w-full text-xs px-3 py-2 ${activeTheme.input} rounded-lg text-slate-105 placeholder:text-slate-500`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className={`block text-[11px] font-bold ${activeTheme.textMuted}`}>Mobile Number (Phone)</label>
                  <input 
                    type="tel" 
                    required 
                    value={formPhone} 
                    onChange={e => setFormPhone(e.target.value)}
                    placeholder="e.g. 01712345678"
                    className={`w-full text-xs px-3 py-2 ${activeTheme.input} rounded-lg text-slate-100 font-mono placeholder:text-slate-500`}
                  />
                </div>
                <div className="space-y-1">
                  <label className={`block text-[11px] font-bold ${activeTheme.textMuted}`}>Email Address (Email)</label>
                  <input 
                    type="email" 
                    value={formEmail} 
                    onChange={e => setFormEmail(e.target.value)}
                    placeholder="e.g. student@gmail.com"
                    className={`w-full text-xs px-3 py-2 ${activeTheme.input} rounded-lg text-slate-100 placeholder:text-slate-500`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className={`block text-[11px] font-bold ${activeTheme.textMuted}`}>Transaction ID (TrxID)</label>
                  <input 
                    type="text" 
                    required 
                    value={formTransactionId} 
                    onChange={e => setFormTransactionId(e.target.value)}
                    placeholder="e.g. BKX837D92"
                    className={`w-full text-xs px-3 py-2 ${activeTheme.input} rounded-lg text-slate-100 font-mono uppercase placeholder:text-slate-500`}
                  />
                </div>
                <div className="space-y-1">
                  <label className={`block text-[11px] font-bold ${activeTheme.textMuted}`}>Status</label>
                  <select 
                    value={formStatus} 
                    onChange={e => setFormStatus(e.target.value as any)}
                    className={`w-full text-xs px-3 py-2 ${activeTheme.input} rounded-lg text-slate-100`}
                  >
                    <option value="pending" className="bg-[#141b2d] text-slate-100">Pending</option>
                    <option value="approved" className="bg-[#141b2d] text-slate-100">Approved</option>
                    <option value="declined" className="bg-[#141b2d] text-slate-100">Declined</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className={`block text-[11px] font-bold ${activeTheme.textMuted}`}>Course Plan Name</label>
                  <input 
                    type="text" 
                    required 
                    value={formPlanName} 
                    onChange={e => setFormPlanName(e.target.value)}
                    placeholder="Premium Live Batch"
                    className={`w-full text-xs px-3 py-2 ${activeTheme.input} rounded-lg text-slate-100 placeholder:text-slate-550`}
                  />
                </div>
                <div className="space-y-1">
                  <label className={`block text-[11px] font-bold ${activeTheme.textMuted}`}>Course Fee</label>
                  <input 
                    type="text" 
                    required 
                    value={formPlanPrice} 
                    onChange={e => setFormPlanPrice(e.target.value)}
                    placeholder="৳ 2,999"
                    className={`w-full text-xs px-3 py-2 ${activeTheme.input} rounded-lg text-slate-100 font-sans placeholder:text-slate-550`}
                  />
                </div>
              </div>

              <div className={`pt-4 border-t ${activeTheme.border} flex justify-end gap-3`}>
                <button 
                  type="button" 
                  onClick={() => setShowAddModal(false)}
                  className={`px-4 py-2 ${comfortTheme === 'slate' ? 'bg-slate-800 hover:bg-slate-700 text-slate-100' : 'bg-black/10 hover:bg-black/20 text-slate-705'} rounded-lg text-xs font-bold transition cursor-pointer`}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={isSaving}
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-550 text-white rounded-lg text-xs font-bold transition flex items-center justify-center gap-1 cursor-pointer"
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
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className={`${activeTheme.card} border ${activeTheme.border} rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl animate-scaleIn animate-fadeIn`}>
            <div className={`p-5 bg-black/10 border-b ${activeTheme.border} flex justify-between items-center`}>
              <h3 className={`text-sm font-bold ${activeTheme.textTitle} flex items-center gap-2`}>
                <Edit className="w-4 h-4 text-indigo-400" /> Edit Payment Details
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

            <form onSubmit={handleUpdatePayment} className="p-5 space-y-4 font-sans">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className={`block text-[11px] font-bold ${activeTheme.textMuted}`}>Student Name (English)</label>
                  <input 
                    type="text" 
                    required 
                    value={formName} 
                    onChange={e => setFormName(e.target.value)}
                    className={`w-full text-xs px-3 py-2 ${activeTheme.input} rounded-lg text-slate-105`}
                  />
                </div>
                <div className="space-y-1">
                  <label className={`block text-[11px] font-bold ${activeTheme.textMuted}`}>Your Name (Bangla field)</label>
                  <input 
                    type="text" 
                    value={formNameBangla} 
                    onChange={e => setFormNameBangla(e.target.value)}
                    className={`w-full text-xs px-3 py-2 ${activeTheme.input} rounded-lg text-slate-105`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className={`block text-[11px] font-bold ${activeTheme.textMuted}`}>Mobile Number (Phone)</label>
                  <input 
                    type="tel" 
                    required 
                    value={formPhone} 
                    onChange={e => setFormPhone(e.target.value)}
                    className={`w-full text-xs px-3 py-2 ${activeTheme.input} rounded-lg text-slate-100 font-mono`}
                  />
                </div>
                <div className="space-y-1">
                  <label className={`block text-[11px] font-bold ${activeTheme.textMuted}`}>Email Address (Email)</label>
                  <input 
                    type="email" 
                    value={formEmail} 
                    onChange={e => setFormEmail(e.target.value)}
                    className={`w-full text-xs px-3 py-2 ${activeTheme.input} rounded-lg text-slate-100`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className={`block text-[11px] font-bold ${activeTheme.textMuted}`}>Transaction ID (TrxID)</label>
                  <input 
                    type="text" 
                    required 
                    value={formTransactionId} 
                    onChange={e => setFormTransactionId(e.target.value)}
                    className={`w-full text-xs px-3 py-2 ${activeTheme.input} rounded-lg text-slate-101 font-mono uppercase`}
                  />
                </div>
                <div className="space-y-1">
                  <label className={`block text-[11px] font-bold ${activeTheme.textMuted}`}>Status</label>
                  <select 
                    value={formStatus} 
                    onChange={e => setFormStatus(e.target.value as any)}
                    className={`w-full text-xs px-3 py-2 ${activeTheme.input} rounded-lg text-slate-100`}
                  >
                    <option value="pending" className="bg-[#141b2d] text-slate-100">Pending</option>
                    <option value="approved" className="bg-[#141b2d] text-slate-100">Approved</option>
                    <option value="declined" className="bg-[#141b2d] text-slate-100">Declined</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className={`block text-[11px] font-bold ${activeTheme.textMuted}`}>Course Plan Name</label>
                  <input 
                    type="text" 
                    required 
                    value={formPlanName} 
                    onChange={e => setFormPlanName(e.target.value)}
                    className={`w-full text-xs px-3 py-2 ${activeTheme.input} rounded-lg text-slate-100`}
                  />
                </div>
                <div className="space-y-1">
                  <label className={`block text-[11px] font-bold ${activeTheme.textMuted}`}>Course Fee</label>
                  <input 
                    type="text" 
                    required 
                    value={formPlanPrice} 
                    onChange={e => setFormPlanPrice(e.target.value)}
                    className={`w-full text-xs px-3 py-2 ${activeTheme.input} rounded-lg text-slate-100 font-sans`}
                  />
                </div>
              </div>

              <div className={`pt-4 border-t ${activeTheme.border} flex justify-end gap-3`}>
                <button 
                  type="button" 
                  onClick={() => {
                    setShowEditModal(false);
                    setEditingRecord(null);
                  }}
                  className={`px-4 py-2 ${comfortTheme === 'slate' ? 'bg-slate-800 hover:bg-slate-700 text-slate-100' : 'bg-black/10 hover:bg-black/20 text-slate-705'} rounded-lg text-xs font-bold transition cursor-pointer`}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={isSaving}
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-550 text-white rounded-lg text-xs font-bold transition flex items-center justify-center gap-1 cursor-pointer"
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
