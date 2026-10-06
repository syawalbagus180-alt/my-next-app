'use client';

import React, { useState, useMemo } from 'react';
import { 
  Users, Calendar, Image, Mail, Phone, MapPin, Search, ChevronRight, 
  CheckCircle2, Menu, X, Award, Heart, Shield, Sparkles, Filter, 
  Eye, UserPlus, Send, ArrowRight, BookOpen, Clock, Check, Info,
  UserCheck, Star, Activity
} from 'lucide-react';
import { supabase } from '../lib/supabase';

// Custom Social Media Icons
const InstagramIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const FacebookIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const YoutubeIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

// Toast Component
const NotificationToast = ({ message, type, onClose }) => {
  if (!message) return null;
  return (
    <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl border text-sm font-medium transition-all ${
      type === 'error' 
        ? 'bg-rose-950/90 text-rose-200 border-rose-800/80 backdrop-blur-md' 
        : 'bg-emerald-950/90 text-emerald-200 border-emerald-800/80 backdrop-blur-md'
    }`}>
      {type === 'error' ? <Info className="w-5 h-5 text-rose-400" /> : <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
      <span>{message}</span>
      <button onClick={onClose} className="ml-2 hover:opacity-80 p-1 rounded-lg">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

// Data Dummy Pengurus
const DATA_PENGURUS = [
  {
    id: 1,
    nama: 'Syawal Bagus S',
    jabatan: 'Ketua Umum Karang Taruna',
    divisi: 'BPH',
    noHp: '+62 882-0038-57815',
    foto: '/fotoku.PNG',
    quote: 'Pemuda hari ini adalah pemimpin masa depan lingkungan kita.'
  },
  {
    id: 2,
    nama: 'Aril',
    jabatan: 'Wakil Ketua Umum',
    divisi: 'BPH',
    noHp: '+62 895-0197-3777',
    foto: '/Angga.jpg',
    quote: 'Kebersamaan dan integritas adalah kunci sukses organisasi.'
  },
  {
    id: 3,
    nama: 'Angga',
    jabatan: 'Sekretaris',
    divisi: 'BPH',
    noHp: '+62 896-6901-4652',
    foto: '/Angga.jpg',
    quote: 'Administrasi yang rapi mewujudkan tata kelola terpercaya.'
  },
  {
    id: 4,
    nama: 'Nurul',
    jabatan: 'Bendahara Umum',
    divisi: 'BPH',
    noHp: '+62 877-3537-3547',
    foto: '/Angga.jpg',
    quote: 'Transparansi finansial membangun kepercayaan seluruh warga.'
  },
  {
    id: 5,
    nama: 'Bella',
    jabatan: 'Ketua Divisi PSDM',
    divisi: 'PSDM',
    noHp: '-',
    foto: '/Angga.jpg',
    quote: 'Meningkatkan kualitas SDM & Kompeten.'
  },
  {
    id: 6,
    nama: 'Kumala Dewi Oktavia',
    jabatan: 'Ketua Divisi Humas',
    divisi: 'Humas',
    noHp: '+62 858-7689-0316',
    foto: '/Angga.jpg',
    quote: 'Mempererat Hubungan anggota & masyarakat.'
  },
  {
    id: 7,
    nama: 'Raul',
    jabatan: 'Ketua Medkominfo',
    divisi: 'Medkominfo',
    noHp: '-',
    foto: '/Angga.jpg',
    quote: 'Meningkatkan Citra Organisasi Yang Profesional.'
  },
];

// Data Dummy Kegiatan
const DATA_KEGIATAN = [
  {
    id: 1,
    judul: 'Kumpulan rutin bulanan',
    kategori: 'Seluruh anggota',
    deskripsi: 'menyambung silaturahmi, kegiatan yang mengumpulkan seluruh remaja RW 08 Desa Bendosari.',
    tanggal: '16 Oktober 2026',
    lokasi: 'Rumah Mas Syawal RW 08',
    peserta: '10+ anggota karang taruna',
    status: 'Akan Datang'
  },
  {
    id: 2,
    judul: 'Voli masyarakat RW 08 desa Bendosari',
    kategori: 'Olahraga',
    deskripsi: 'Olahraga Voli persahabatan antar pemuda dan masyarakat guna mempererat tali persaudaraan dan membina bakat olahraga.',
    tanggal: 'Setiap hari',
    lokasi: 'Lapangan Serbaguna RT 01',
    peserta: 'Seluruh warga Bendosari',
    status: 'Akan Datang'
  },
  {
    id: 4,
    judul: 'Memperingati HUT R1 ke-81',
    kategori: 'Karnaval Tahunan',
    deskripsi: 'seluruh acara diserahkan kepada Karang Taruna IRMABEND, dan kami berkomitmen agar acara benrjalan dengan lancar tanpa halangan.',
    tanggal: '18 Agustus 2026',
    lokasi: 'Mushola Nurul Huda',
    peserta: '100+ Warga RW 08',
    status: 'Selesai'
  },
  {
    id: 5,
    judul: 'Peringatan HUT RI ke-81 & Pentas Seni Kebudayaan',
    kategori: 'Seni & Budaya',
    deskripsi: 'Rangkaian lomba anak-anak dan malam puncak pentas seni tari l.',
    tanggal: '17 - 18 Agustus 2026',
    lokasi: 'Lapangan serbaguna RT 01',
    peserta: 'Seluruh Warga Desa Bendosari',
    status: 'Selesai'
  }
];

// Data Dummy Galeri
const DATA_GALERI = [
  {
    id: 1,
    judul: 'Aksi Penghijauan & Tanam Bibit Pohon',
    kategori: 'Lingkungan',
    tanggal: 'Mei 2026',
    url: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 2,
    judul: 'Penyaluran Paket Sembako Warga',
    kategori: 'Sosial',
    tanggal: 'April 2026',
    url: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 3,
    judul: 'Latihan Rutin Voli Warga RW 08',
    kategori: 'Olahraga',
    tanggal: 'Juni 2026',
    url: '/angga.jpg'
  },
  {
    id: 4,
    judul: 'Pentas Seni Musik & Tari Tradisional',
    kategori: 'Seni',
    tanggal: 'Agustus 2026',
    url: '/angga.jpg'
  },
  {
    id: 5,
    judul: 'Rapat Kerja Bulanan Pengurus',
    kategori: 'Organisasi',
    tanggal: 'Juli 2026',
    url: '/angga.jpg'
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('beranda');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // State Notifikasi Toast
  const [toast, setToast] = useState({ message: '', type: 'success' });

  // State Filter Pengurus
  const [pengurusSearch, setPengurusSearch] = useState('');
  const [selectedDivisi, setSelectedDivisi] = useState('Semua');

  // State Filter Kegiatan
  const [kegiatanFilterStatus, setKegiatanFilterStatus] = useState('Semua');
  const [kegiatanSearch, setKegiatanSearch] = useState('');

  // State Lightbox Galeri
  const [activeImage, setActiveImage] = useState(null);
  const [galeriKategori, setGaleriKategori] = useState('Semua');

  // State Statistik Interaktif (Simulasi Warga memberi dukungan)
  const [dukunganCount, setDukunganCount] = useState(342);
  const [hasVoted, setHasVoted] = useState(false);

  // State Form Pendaftaran Anggota Baru
  const [formPendaftaran, setFormPendaftaran] = useState({
    namaLengkap: 'Contoh: Syawal Bagus S',
    email: '',
    noWhatsApp: '08XXXX',
    rtRw: 'RT 01/RW 08',
    minatDivisi: '',
    alasanGabung: ''
  });

  // State Form Kontak / Saran
  const [formKontak, setFormKontak] = useState({
    nama: '',
    email: '',
    pesan: ''
  });

  // Helper untuk menampilkan Notifikasi
  const showNotification = (msg, type = 'success') => {
    setToast({ message: msg, type });
    setTimeout(() => setToast({ message: '', type: 'success' }), 4000);
  };

  // Handler Submit Form Pendaftaran (sudah terhubung dengan supabase)
  const handlePendaftaranSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formPendaftaran.namaLengkap || !formPendaftaran.noWhatsApp) {
      showNotification('Harap isi Nama Lengkap dan Nomor WhatsApp!', 'error');
      return;
    }

    try {
    // 1. Kirim data nyata ke tabel 'pendaftar' di Supabase
    const { data, error } = await supabase
      .from('pendaftar')
      .insert([
        {
          nama: formPendaftaran.namaLengkap,
          telepon: formPendaftaran.noWhatsApp,
          rtrw: formPendaftaran.wilayah || formPendaftaran.rtRw || '',
          alasan: formPendaftaran.alasan || formPendaftaran.minatDivisi || '-',
          status: 'Pending'
        }
      ]);

    // 3. Tampilkan notifikasi sukses jika data BERSINGGAH di Supabase
    showNotification(`Selamat! Pendaftaran ${formPendaftaran.namaLengkap} berhasil terkirim. Pengurus akan menghubungi via WA.`);

    // 4. Reset formulir
    setFormPendaftaran({
      namaLengkap: '',
      email: '',
      noWhatsApp: '',
      wilayah: '',
      minatDivisi: '',
      alasan: ''
    });

  } catch (err: any) {
    console.error('Catch Error:', err);
    showNotification('Terjadi kesalahan sistem: ' + err.message);
  }
};
  // Handler Submit Form Kontak
  const handleKontakSubmit = (e) => {
    e.preventDefault();
    if (!formKontak.nama || !formKontak.pesan) {
      showNotification('Mohon lengkapi Nama dan Pesan Anda.', 'error');
      return;
    }
    showNotification('Pesan atau saran Anda berhasil terkirim. Terima kasih!');
    setFormKontak({ nama: '', email: '', pesan: '' });
  };

  // Handler Dukungan Warga (Interaktif)
  const handleDukungan = () => {
    if (!hasVoted) {
      setDukunganCount(prev => prev + 1);
      setHasVoted(true);
      showNotification('Terima kasih atas dukungan Anda untuk Karang Taruna!');
    } else {
      showNotification('Anda sudah memberikan dukungan!', 'error');
    }
  };

  // Filter List Pengurus
  const filteredPengurus = useMemo(() => {
    return DATA_PENGURUS.filter(p => {
      const matchSearch = p.nama.toLowerCase().includes(pengurusSearch.toLowerCase()) || 
                          p.jabatan.toLowerCase().includes(pengurusSearch.toLowerCase());
      const matchDivisi = selectedDivisi === 'Semua' || p.divisi === selectedDivisi;
      return matchSearch && matchDivisi;
    });
  }, [pengurusSearch, selectedDivisi]);

  // Filter List Kegiatan
  const filteredKegiatan = useMemo(() => {
    return DATA_KEGIATAN.filter(k => {
      const matchStatus = kegiatanFilterStatus === 'Semua' || k.status === kegiatanFilterStatus;
      const matchSearch = k.judul.toLowerCase().includes(kegiatanSearch.toLowerCase()) ||
                          k.kategori.toLowerCase().includes(kegiatanSearch.toLowerCase());
      return matchStatus && matchSearch;
    });
  }, [kegiatanFilterStatus, kegiatanSearch]);

  // Filter List Galeri
  const filteredGaleri = useMemo(() => {
    if (galeriKategori === 'Semua') return DATA_GALERI;
    return DATA_GALERI.filter(g => g.kategori === galeriKategori);
  }, [galeriKategori]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500 selection:text-white">
      
      {/* Toast Notification */}
      <NotificationToast 
        message={toast.message} 
        type={toast.type} 
        onClose={() => setToast({ message: '', type: 'success' })} 
      />

      {/* HEADER / NAVIGATION BAR */}
      <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800/80 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo & Name */}
          <div 
            onClick={() => setActiveTab('beranda')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-900/40 group-hover:scale-105 transition-transform">
              <Sparkles className="w-6 h-6 text-slate-950 font-bold" />
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-400 via-teal-200 to-white bg-clip-text text-transparent">
                KARANG TARUNA BENDOSARI
              </span>
              <p className="text-xs text-slate-400 font-medium">Karang Taruna RW 008</p>
            </div>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-950/50 p-1.5 rounded-full border border-slate-800">
            {[
              { id: 'beranda', label: 'Beranda' },
              { id: 'profil', label: 'Profil & Visi' },
              { id: 'pengurus', label: 'Pengurus' },
              { id: 'kegiatan', label: 'Kegiatan' },
              { id: 'galeri', label: 'Galeri' },
              { id: 'pendaftaran', label: 'Gabung & Kontak' },
            ].map((nav) => (
              <button
                key={nav.id}
                onClick={() => setActiveTab(nav.id)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  activeTab === nav.id
                    ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {nav.label}
              </button>
            ))}
          </nav>

          {/* Action CTA & Mobile Menu Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('pendaftaran')}
              className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm transition-all shadow-md hover:shadow-emerald-500/20 active:scale-95"
            >
              <UserPlus className="w-4 h-4" />
              <span>Daftar Anggota</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 rounded-xl bg-slate-800 text-slate-200 hover:text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-slate-800 bg-slate-900/95 backdrop-blur-lg px-4 pt-3 pb-6 space-y-2">
            {[
              { id: 'beranda', label: 'Beranda' },
              { id: 'profil', label: 'Profil & Visi Misi' },
              { id: 'pengurus', label: 'Struktur Pengurus' },
              { id: 'kegiatan', label: 'Agenda & Program Kerja' },
              { id: 'galeri', label: 'Galeri Foto' },
              { id: 'pendaftaran', label: 'Pendaftaran & Kontak' },
            ].map((nav) => (
              <button
                key={nav.id}
                onClick={() => {
                  setActiveTab(nav.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                  activeTab === nav.id
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                {nav.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">

        {/* ==================== TAB 1: BERANDA ==================== */}
        {activeTab === 'beranda' && (
          <div className="space-y-16 animate-fadeIn">
            
            {/* Hero Section */}
            <section className="relative rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 p-8 sm:p-12 md:p-16 overflow-hidden shadow-2xl">
              {/* Background Glow Overlay */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl -z-0 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl -z-0 pointer-events-none" />

              <div className="relative z-10 max-w-3xl space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs sm:text-sm font-semibold tracking-wide">
                  <Sparkles className="w-4 h-4" />
                  <span>Organisasi Karang Taruna Ikatan Remaja Kampung Bendosari RW 008, Kel.Sadeng, Kec.Gunungpati (IRMABEND)</span>
                </div>

                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight">
                  Bendosari Bersatu, <br />
                  <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                  Berkembang Untuk Desa
                  </span>
                </h1>

                <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl">
                  Selamat datang di Organisasi Karang Taruna <strong className="text-white">IRMABEND</strong>. 
                  Kami hadir sebagai tempat kreativitas anda, kepedulian sosial, serta pengembangan potensi generasi muda lokal, silahkan bergabung dengan klik tombol dibawah.                </p>

                {/* Hero Action Buttons */}
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <button
                    onClick={() => setActiveTab('pendaftaran')}
                    className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-base transition-all shadow-lg shadow-emerald-500/25 active:scale-95"
                  >
                    <UserPlus className="w-5 h-5" />
                    <span>Gabung Sekarang</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('kegiatan')}
                    className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-base transition-all"
                  >
                    <span>Lihat Agenda</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Statistics Grid */}
              <div className="mt-12 pt-10 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="bg-slate-950/60 p-4 sm:p-5 rounded-2xl border border-slate-800/60">
                  <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400">30+</div>
                  <div className="text-xs sm:text-sm text-slate-400 mt-1 font-medium">Anggota Aktif</div>
                </div>
                <div className="bg-slate-950/60 p-4 sm:p-5 rounded-2xl border border-slate-800/60">
                  <div className="text-2xl sm:text-3xl font-extrabold text-teal-400">10+</div>
                  <div className="text-xs sm:text-sm text-slate-400 mt-1 font-medium">Program Sukses</div>
                </div>
                <div className="bg-slate-950/60 p-4 sm:p-5 rounded-2xl border border-slate-800/60">
                  <div className="text-2xl sm:text-3xl font-extrabold text-cyan-400">3 RT</div>
                  <div className="text-xs sm:text-sm text-slate-400 mt-1 font-medium">Cakupan Wilayah</div>
                </div>
                
                {/* Interactive Support Counter */}
                <div 
                  onClick={handleDukungan}
                  className="bg-emerald-950/30 p-4 sm:p-5 rounded-2xl border border-emerald-500/30 cursor-pointer hover:bg-emerald-900/40 transition-all group"
                >
                  <div className="flex items-center justify-between">
                    <div className="text-2xl sm:text-3xl font-extrabold text-amber-400">{dukunganCount}</div>
                    <Heart className={`w-5 h-5 ${hasVoted ? 'text-rose-500 fill-rose-500' : 'text-slate-400 group-hover:text-rose-400'}`} />
                  </div>
                  <div className="text-xs sm:text-sm text-slate-300 mt-1 font-medium group-hover:text-emerald-300">
                    {hasVoted ? 'Dukungan Anda Terkirim!' : 'Klik Dukung Karang Taruna'}
                  </div>
                </div>
              </div>
            </section>

            {/* Quick Highlights Section */}
            <section className="grid md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 hover:border-emerald-500/40 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold">
                  <Heart className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white">Aksi Sosial Masyarakat</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Rutin menyalurkan bantuan, bakti sosial lingkungan Hidup, dan pendampingan warga yang membutuhkan.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 hover:border-teal-500/40 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center font-bold">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white">Pengembangan Bakat</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Menyediakan edukasi Sosial & lingkungan hidup, seni kebudayaan, serta ruang kreasi konten kreatif bagi generasi muda.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 hover:border-cyan-500/40 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-bold">
                  <Shield className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white">Kemandirian Ekonomi</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Mendorong lahirnya generasi muda mandiri melalui pelatihan dan edukasi serta dukungan dari team profesional lokal.
                </p>
              </div>
            </section>

            {/* Upcoming Agenda Highlight */}
            <section className="bg-slate-900/60 rounded-3xl border border-slate-800 p-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-extrabold text-white">Agenda Mendatang</h2>
                  <p className="text-slate-400 text-sm">Jangan sampai melewatkan agenda kegiatan Karang Taruna</p>
                </div>
                <button 
                  onClick={() => setActiveTab('kegiatan')}
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-400 hover:text-emerald-300"
                >
                  <span>Lihat Semua Agenda</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {DATA_KEGIATAN.filter(k => k.status === 'Akan Datang').slice(0, 2).map((kegiatan) => (
                  <div key={kegiatan.id} className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition-all">
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                        {kegiatan.kategori}
                      </span>
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {kegiatan.tanggal}
                      </span>
                    </div>
                    <h4 className="text-base font-bold text-white">{kegiatan.judul}</h4>
                    <p className="text-xs text-slate-400 line-clamp-2">{kegiatan.deskripsi}</p>
                    <div className="pt-2 flex items-center justify-between text-xs text-slate-400 border-t border-slate-900">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                        {kegiatan.lokasi}
                      </span>
                      <span className="text-slate-300 font-medium">{kegiatan.peserta}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* ==================== TAB 2: PROFIL & VISI MISI ==================== */}
        {activeTab === 'profil' && (
          <div className="space-y-12 animate-fadeIn">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <h2 className="text-3xl font-black text-white">Profil & Landasan Organisasi</h2>
              <p className="text-slate-400 text-sm">Mengenal sejarah, visi, dan misi kepengurusan IRMABEND RW 008 Desa Bendosari.</p>
            </div>

            {/* Sejarah Singkat */}
            <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex items-center gap-3">
                <BookOpen className="w-6 h-6 text-emerald-400" />
                <h3 className="text-xl font-bold text-white">Sejarah Singkat</h3>
              </div>
              <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                Karang Taruna <strong className="text-emerald-400">IRMABEND</strong> didirikan pada tanggal 12 Juni 2015 
                sebagai respon atas aspirasi pemuda di lingkungan RW 008 Desa Bendosari. Berawal dari perkumpulan sederhana 
                pemuda antar-RT, kini Organisa IRMABEND tumbuh menjadi tempat sosial kemasyarakatan yang terstruktur, aktif, dan 
                diakui oleh tokoh masyarakat.
              </p>
            </div>

            {/* Visi & Misi Grid */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Visi */}
              <div className="p-8 rounded-3xl bg-gradient-to-br from-slate-900 to-emerald-950/40 border border-emerald-500/20 space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-black text-white">Visi Kami</h3>
                <p className="text-slate-200 text-base italic leading-relaxed">
                  "Terwujudnya generasi muda RW 008 menjadi yang mandiri, kreatif, inovatif, peduli sosial, serta berdaya saing tinggi dalam memajukan lingkungan masyarakat."
                </p>
              </div>

              {/* Misi */}
              <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-teal-500/10 text-teal-400 flex items-center justify-center font-bold">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-black text-white">Misi Utama</h3>
                <ul className="space-y-3 text-slate-300 text-sm">
                  {[
                    'Menyelenggarakan kegiatan sosial dan toleransi antar-warga.',
                    'Mengembangkan minat, bakat, dan seni budaya pemuda.',
                    'Meningkatkan keterampilan sosial media berbasis potensi lokal.',
                    'Mempererat persaudaraan antar-RT melalui kegiatan rutin positif.'
                  ].map((misi, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{misi}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Panca Karsa / Values */}
            <div className="bg-slate-900/50 rounded-3xl border border-slate-800 p-8 space-y-6">
              <h3 className="text-xl font-bold text-white text-center">Nilai Utama (Panca Karsa)</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {[
                  { title: 'Integritas', desc: 'Jujur & Tanggung Jawab' },
                  { title: 'Gotong Royong', desc: 'Saling Membantu' },
                  { title: 'Kreatif', desc: 'Inovasi Berkelanjutan' },
                  { title: 'Santun', desc: 'Menghormati Orang  ayng lebih Tua' },
                  { title: 'Mandiri', desc: 'Mampu Berdiri Sendiri' },
                ].map((item, index) => (
                  <div key={index} className="p-4 rounded-xl bg-slate-950 text-center border border-slate-800 space-y-1">
                    <div className="text-emerald-400 font-bold text-base">{item.title}</div>
                    <div className="text-slate-400 text-xs">{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ==================== TAB 3: PENGURUS ==================== */}
        {activeTab === 'pengurus' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-3xl font-black text-white">Struktur Pengurus</h2>
                <p className="text-slate-400 text-sm">Periode 2025 - 2027 Karang Taruna IRMABEND</p>
              </div>

              {/* Search Bar */}
              <div className="relative min-w-[260px]">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  placeholder="Cari nama atau jabatan..."
                  value={pengurusSearch}
                  onChange={(e) => setPengurusSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Division Filter Buttons */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {['Semua', 'BPH', 'Humas & Media', 'Kerohanian', 'Seni & Budaya',].map((divisi) => (
                <button
                  key={divisi}
                  onClick={() => setSelectedDivisi(divisi)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                    selectedDivisi === divisi
                      ? 'bg-emerald-500 text-slate-950 font-bold'
                      : 'bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-white border border-slate-800'
                  }`}
                >
                  {divisi}
                </button>
              ))}
            </div>

            {/* Pengurus Cards Grid */}
            {filteredPengurus.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredPengurus.map((p) => (
                  <div key={p.id} className="group rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden hover:border-emerald-500/40 transition-all duration-300">
                    <div className="h-48 overflow-hidden relative">
                      <img 
                        src={p.foto} 
                        alt={p.nama} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                      <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-emerald-400 text-xs font-bold border border-slate-800">
                        {p.divisi}
                      </div>
                    </div>
                    <div className="p-5 space-y-2">
                      <div className="text-xs font-semibold text-emerald-400 tracking-wider uppercase">{p.jabatan}</div>
                      <h4 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">{p.nama}</h4>
                      <p className="text-xs text-slate-400 italic">"{p.quote}"</p>
                      
                      <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                        <span className="flex items-center gap-1">
                          <Phone className="w-3.5 h-3.5 text-emerald-400" />
                          {p.noHp}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-12 text-center rounded-2xl bg-slate-900 border border-slate-800 text-slate-400">
                Pengurus tidak ditemukan dengan kata kunci atau divisi tersebut.
              </div>
            )}
          </div>
        )}

        {/* ==================== TAB 4: KEGIATAN ==================== */}
        {activeTab === 'kegiatan' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-3xl font-black text-white">Agenda & Program Kerja</h2>
                <p className="text-slate-400 text-sm">Daftar kegiatan aktif, rencana mendatang, serta rekap kegiatan selesai</p>
              </div>

              {/* Search Kegiatan */}
              <div className="relative min-w-[260px]">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  placeholder="Cari program kerja..."
                  value={kegiatanSearch}
                  onChange={(e) => setKegiatanSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Status Tabs */}
            <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
              {['Semua', 'Akan Datang', 'Berjalan', 'Selesai'].map((status) => (
                <button
                  key={status}
                  onClick={() => setKegiatanFilterStatus(status)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                    kegiatanFilterStatus === status
                      ? 'bg-emerald-500 text-slate-950 font-bold'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>

            {/* Kegiatan List Cards */}
            <div className="grid md:grid-cols-2 gap-6">
              {filteredKegiatan.map((k) => (
                <div key={k.id} className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 hover:border-slate-700 transition-all">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-800 text-emerald-400 border border-slate-700">
                      {k.kategori}
                    </span>
                    
                    {/* Status Badge */}
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      k.status === 'Akan Datang' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                      k.status === 'Berjalan' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                      'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    }`}>
                      {k.status}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white">{k.judul}</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">{k.deskripsi}</p>

                  <div className="pt-4 border-t border-slate-800/80 grid grid-cols-2 gap-2 text-xs text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-emerald-400" />
                      <span>{k.tanggal}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-emerald-400" />
                      <span>{k.lokasi}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================== TAB 5: GALERI ==================== */}
        {activeTab === 'galeri' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-3xl font-black text-white">Galeri Dokumentasi</h2>
                <p className="text-slate-400 text-sm">Momen kebersamaan dan potret kegiatan pemuda Tunas Muda</p>
              </div>

              {/* Kategori Galeri */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                {['Semua', 'Lingkungan', 'Sosial', 'Olahraga', 'Seni', 'Organisasi', 'Ekonomi'].map((kat) => (
                  <button
                    key={kat}
                    onClick={() => setGaleriKategori(kat)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                      galeriKategori === kat
                        ? 'bg-emerald-500 text-slate-950 font-bold'
                        : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    {kat}
                  </button>
                ))}
              </div>
            </div>

            {/* Galeri Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGaleri.map((g) => (
                <div 
                  key={g.id}
                  onClick={() => setActiveImage(g)}
                  className="group relative h-64 rounded-2xl overflow-hidden cursor-pointer border border-slate-800 bg-slate-900"
                >
                  <img 
                    src={g.url} 
                    alt={g.judul} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                  
                  <div className="absolute bottom-4 left-4 right-4 space-y-1">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-400 bg-slate-950/80 px-2 py-0.5 rounded-md border border-slate-800">
                      {g.kategori}
                    </span>
                    <h4 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors">{g.judul}</h4>
                    <p className="text-xs text-slate-400">{g.tanggal}</p>
                  </div>

                  <div className="absolute top-3 right-3 p-2 rounded-xl bg-slate-950/60 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <Eye className="w-4 h-4" />
                  </div>
                </div>
              ))}
            </div>

            {/* Lightbox Modal Preview */}
            {activeImage && (
              <div 
                onClick={() => setActiveImage(null)}
                className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4"
              >
                <div 
                  onClick={(e) => e.stopPropagation()}
                  className="relative max-w-4xl w-full bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden shadow-2xl space-y-4 p-4 sm:p-6"
                >
                  <button 
                    onClick={() => setActiveImage(null)}
                    className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-300 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  <img 
                    src={activeImage.url} 
                    alt={activeImage.judul} 
                    className="w-full h-80 sm:h-[450px] object-cover rounded-2xl" 
                  />

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-white">{activeImage.judul}</h3>
                      <p className="text-xs text-slate-400">{activeImage.kategori} • {activeImage.tanggal}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ==================== TAB 6: PENDAFTARAN & KONTAK ==================== */}
        {activeTab === 'pendaftaran' && (
          <div className="grid lg:grid-cols-2 gap-12 animate-fadeIn">
            
            {/* Form Pendaftaran Anggota Baru */}
            <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold">
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Form Open Recruitment</span>
                </div>
                <h2 className="text-2xl font-black text-white">Formulir Anggota Baru</h2>
                <p className="text-xs text-slate-400">Mari berkontribusi membangun lingkungan yang lebih hidup dan positif.</p>
              </div>

              <form onSubmit={handlePendaftaranSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Nama Lengkap *</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Ahmad Fauzi"
                    value={formPendaftaran.namaLengkap}
                    onChange={(e) => setFormPendaftaran({ ...formPendaftaran, namaLengkap: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">No. WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      placeholder="0812xxxx"
                      value={formPendaftaran.noWhatsApp}
                      onChange={(e) => setFormPendaftaran({ ...formPendaftaran, noWhatsApp: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300">Wilayah RT / RW</label>
                    <select
                      value={formPendaftaran.rtRw}
                      onChange={(e) => setFormPendaftaran({ ...formPendaftaran, rtRw: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-emerald-500"
                    >
                      <option value="RT 01 / RW 05">RT 01 / RW 05</option>
                      <option value="RT 02 / RW 05">RT 02 / RW 05</option>
                      <option value="RT 03 / RW 05">RT 03 / RW 05</option>
                      <option value="RT 04 / RW 05">RT 04 / RW 05</option>
                      <option value="RT 05 / RW 05">RT 05 / RW 05</option>
                      <option value="RT 06 / RW 05">RT 06 / RW 05</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Minat Divisi</label>
                  <select
                    value={formPendaftaran.minatDivisi}
                    onChange={(e) => setFormPendaftaran({ ...formPendaftaran, minatDivisi: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Humas & Media">Humas & Media Kreatif</option>
                    <option value="Kerohanian">Kerohanian & Sosial</option>
                    <option value="Olahraga & Seni">Olahraga & Seni Budaya</option>
                    <option value="Kewirausahaan">Kewirausahaan & UMKM</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-300">Alasan Ingin Bergabung</label>
                  <textarea
                    rows={3}
                    placeholder="Ceritakan singkat alasan atau ide Anda..."
                    value={formPendaftaran.alasanGabung}
                    onChange={(e) => setFormPendaftaran({ ...formPendaftaran, alasanGabung: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-emerald-500/20 active:scale-98"
                >
                  Kirim Pendaftaran
                </button>
              </form>
            </div>

            {/* Form Kontak / Saran & Info Sekretariat */}
            <div className="space-y-8">
              {/* Info Kontak Sekretariat */}
              <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
                <h3 className="text-xl font-bold text-white">Sekretariat Karang Taruna</h3>
                <div className="space-y-4 text-sm text-slate-300">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>Gedung Balai Warga RW 05, Jl. Pemuda Mandiri No. 12, Kel. Sukamaju</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    <span>0812-3456-7890 (Sekretaris Rizky)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    <span>karangtaruna.tunasmuda05@gmail.com</span>
                  </div>
                </div>
              </div>

              {/* Form Saran Warga */}
              <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
                <h3 className="text-xl font-bold text-white">Kirim Saran & Aspirasi Warga</h3>
                <form onSubmit={handleKontakSubmit} className="space-y-4">
                  <input
                    type="text"
                    required
                    placeholder="Nama Anda"
                    value={formKontak.nama}
                    onChange={(e) => setFormKontak({ ...formKontak, nama: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                  <textarea
                    rows={3}
                    required
                    placeholder="Tuliskan masukan atau pertanyaan Anda..."
                    value={formKontak.pesan}
                    onChange={(e) => setFormKontak({ ...formKontak, pesan: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-sm transition-all"
                  >
                    Kirim Pesan
                  </button>
                </form>
              </div>
            </div>

          </div>
        )}

      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-800/80 bg-slate-950 pt-12 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            
            {/* Brand */}
            <div className="space-y-3 md:col-span-2">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-500 flex items-center justify-center font-black text-slate-950">
                  TM
                </div>
                <span className="text-lg font-bold text-white">Karang Taruna Tunas Muda</span>
              </div>
              <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
                Wadah binaan kepemudaan RW 05 Kelurahan Sukamaju. Bersama mewujudkan generasi muda cerdas, mandiri, dan berjiwa sosial.
              </p>
            </div>

            {/* Navigasi Cepat */}
            <div className="space-y-3">
              <div className="text-sm font-bold text-white">Navigasi Cepat</div>
              <ul className="space-y-2 text-xs text-slate-400">
                <li><button onClick={() => setActiveTab('beranda')} className="hover:text-emerald-400">Beranda</button></li>
                <li><button onClick={() => setActiveTab('profil')} className="hover:text-emerald-400">Profil & Visi Misi</button></li>
                <li><button onClick={() => setActiveTab('pengurus')} className="hover:text-emerald-400">Struktur Pengurus</button></li>
                <li><button onClick={() => setActiveTab('kegiatan')} className="hover:text-emerald-400">Agenda Kegiatan</button></li>
              </ul>
            </div>

            {/* Media Sosial */}
            <div className="space-y-3">
              <div className="text-sm font-bold text-white">Ikuti Media Sosial</div>
              <div className="flex items-center gap-3">
                <a href="#instagram" aria-label="Instagram" className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-emerald-400 hover:border-emerald-500/40 transition-colors">
                  <InstagramIcon className="w-4 h-4" />
                </a>
                <a href="#facebook" aria-label="Facebook" className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-emerald-400 hover:border-emerald-500/40 transition-colors">
                  <FacebookIcon className="w-4 h-4" />
                </a>
                <a href="#youtube" aria-label="YouTube" className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-emerald-400 hover:border-emerald-500/40 transition-colors">
                  <YoutubeIcon className="w-4 h-4" />
                </a>
              </div>
            </div>

          </div>

          <div className="pt-8 border-t border-slate-900 text-center text-xs text-slate-500">
            © {new Date().getFullYear()} Karang Taruna Tunas Muda RW 05. Hak Cipta Dilindungi Undang-Undang.
          </div>
        </div>
      </footer>

    </div>
  );
}