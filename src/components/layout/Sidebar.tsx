import { Link, useLocation } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useGetMyQueue } from '@/hooks/use-appointments';
import { useState } from 'react';
import {
    DashboardIcon,
    ReceptionIcon,
    QueueIcon,
    CalendarTodayIcon,
    VideoCallIcon,
    ChatIcon,
    HistoryIcon,
    CalendarIcon,
    ScheduleIcon,
    TimeSlotIcon,
    MedicalRecordIcon,
    PatientIcon,
    PrescriptionIcon,
    AIBrainIcon,
    MedicineCabinetIcon,
    ProtocolIcon,
    ReportIcon,
    BillingIcon,
    HelpIcon,
    InfoIcon,
    ChevronDownIcon,
    ChevronRightIcon,
    FolderIcon,
    ClipboardListIcon,
    PillIcon,
} from '@/components/icons/SidebarIcons';

interface NavItem {
    name: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
    description?: string;
    badge?: number;
    highlight?: boolean;
}

interface SidebarProps {
    collapsed?: boolean;
}

export function Sidebar({ collapsed = false }: SidebarProps) {
    const location = useLocation();
    const [openSections, setOpenSections] = useState<string[]>(['phongKham', 'hoSo']);

    // Fetch queue count for badge using custom hook
    const { data: queueData } = useGetMyQueue();

    const queueCount = queueData?.totalInQueue || 0;
    // const inProgressCount = queueData?.inProgress?.length || 0; // Unused for now

    // ==================== MENU STRUCTURE ====================

    // 1. TỔNG QUAN
    const overviewNav: NavItem[] = [
        {
            name: 'Tổng Quan',
            href: '/doctor/overview',
            icon: DashboardIcon,
            description: 'Dashboard tổng quan',
        },
    ];

    // 2. PHÒNG KHÁM
    const phongKhamNav: NavItem[] = [
        {
            name: 'Tiếp nhận',
            href: '/doctor/reception',
            icon: ReceptionIcon,
            description: 'Check-in bệnh nhân',
        },
        {
            name: 'Hàng Đợi',
            href: '/doctor/queue',
            icon: QueueIcon,
            description: 'Quản lý hàng đợi',
            badge: queueCount,
        },
        {
            name: 'Lịch Hôm Nay',
            href: '/doctor/today',
            icon: CalendarTodayIcon,
        },
    ];

    // 3. TƯ VẤN TRỰC TUYẾN
    const tuVanNav: NavItem[] = [
        {
            name: 'Phòng Chờ Video',
            href: '/doctor/video-waiting',
            icon: VideoCallIcon,
        },
        {
            name: 'Tin Nhắn',
            href: '/doctor/chat',
            icon: ChatIcon,
        },
        {
            name: 'Lịch Sử Cuộc Gọi',
            href: '/doctor/video-history',
            icon: HistoryIcon,
        },
    ];

    // 4. ĐẶT KHÁM THÔNG MINH
    const datKhamNav: NavItem[] = [
        {
            name: 'Lịch Hẹn',
            href: '/doctor/appointments',
            icon: CalendarIcon,
        },
        {
            name: 'Lịch Làm Việc',
            href: '/doctor/schedules',
            icon: ScheduleIcon,
        },
        {
            name: 'Khung Giờ Khám',
            href: '/doctor/time-slots',
            icon: TimeSlotIcon,
        },
    ];

    // 5. HỒ SƠ
    const hoSoNav: NavItem[] = [
        {
            name: 'Bệnh Án Điện Tử',
            href: '/doctor/medical-records',
            icon: MedicalRecordIcon,
        },
        {
            name: 'Bệnh Nhân',
            href: '/doctor/patients',
            icon: PatientIcon,
        },
        {
            name: 'Đơn Thuốc',
            href: '/doctor/prescriptions',
            icon: PrescriptionIcon,
        },
    ];

    // 6. CẬN LÂM SÀNG
    const canLamSangNav: NavItem[] = [
        {
            name: 'AI X-Quang Phổi',
            href: '/doctor/ai-xray',
            icon: AIBrainIcon,
            highlight: true,
        }
    ];

    // 7. THUỐC & ĐIỀU TRỊ
    const thuocNav: NavItem[] = [
        {
            name: 'Tủ Thuốc Phổi',
            href: '/doctor/medicine',
            icon: MedicineCabinetIcon,
        },
        {
            name: 'Phác Đồ Điều Trị',
            href: '/doctor/protocols',
            icon: ProtocolIcon,
        },
    ];

    // 8. BÁO CÁO & THỐNG KÊ
    const baoCaoNav: NavItem[] = [
        {
            name: 'Báo Cáo',
            href: '/doctor/reports',
            icon: ReportIcon,
        },
        {
            name: 'Hóa Đơn',
            href: '/doctor/billing',
            icon: BillingIcon,
        },
    ];

    // ==================== HANDLERS ====================

    const toggleSection = (section: string) => {
        setOpenSections(prev =>
            prev.includes(section)
                ? prev.filter(s => s !== section)
                : [...prev, section]
        );
    };

    const textClass = collapsed
        ? 'max-w-0 opacity-0 overflow-hidden'
        : 'max-w-[200px] opacity-100';
    const textBaseClass = 'transition-[max-width,opacity] duration-200 whitespace-nowrap';

    // ==================== RENDER FUNCTIONS ====================

    const renderNavItem = (item: NavItem) => {
        const isActive = location.pathname === item.href ||
            location.pathname.startsWith(item.href + '/');

        return (
            <Link
                key={item.name}
                to={item.href}
                className={`flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors ${collapsed ? 'justify-center' : 'justify-between'} ${isActive
                    ? 'bg-blue-50 text-blue-600'
                    : item.highlight
                        ? 'text-purple-600 hover:bg-purple-50 hover:text-purple-700'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                title={item.description}
            >
                <div className={`flex items-center ${collapsed ? 'justify-center' : 'gap-3'}`}>
                    <item.icon className={`h-5 w-5 ${item.highlight ? 'text-purple-500' : ''}`} />
                    <span className={`${textBaseClass} ${textClass}`}>{item.name}</span>
                    {!collapsed && item.highlight && (
                        <span className="text-[10px] bg-purple-100 text-purple-600 px-1.5 py-0.5 rounded-full font-semibold">
                            AI
                        </span>
                    )}
                </div>
                {!collapsed && item.badge !== undefined && item.badge > 0 && (
                    <Badge className="bg-red-500 text-white text-xs px-1.5 py-0.5 min-w-[20px] text-center">
                        {item.badge}
                    </Badge>
                )}
            </Link>
        );
    };

    const renderCollapsibleSection = (
        title: string,
        sectionKey: string,
        icon: React.ComponentType<{ className?: string }>,
        items: NavItem[]
    ) => {
        const Icon = icon;
        const isOpen = openSections.includes(sectionKey);
        const hasActiveChild = items.some(
            item => location.pathname === item.href || location.pathname.startsWith(item.href + '/')
        );
        const totalBadge = items.reduce((acc, item) => acc + (item.badge || 0), 0);

        return (
            <Collapsible open={isOpen} onOpenChange={() => toggleSection(sectionKey)}>
                <CollapsibleTrigger asChild>
                    <button
                        className={`flex w-full items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors ${collapsed ? 'justify-center' : 'justify-between'} ${hasActiveChild
                            ? 'bg-gray-100 text-gray-900'
                            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                            }`}
                    >
                        <div className={`flex items-center ${collapsed ? 'justify-center' : 'gap-3'}`}>
                            <Icon className="h-5 w-5" />
                            <span className={`${textBaseClass} ${textClass}`}>{title}</span>
                            {!collapsed && totalBadge > 0 && (
                                <Badge className="bg-red-500 text-white text-xs px-1.5 py-0.5 min-w-[18px] text-center">
                                    {totalBadge}
                                </Badge>
                            )}
                        </div>
                        {!collapsed && (isOpen ? (
                            <ChevronDownIcon className="h-4 w-4" />
                        ) : (
                            <ChevronRightIcon className="h-4 w-4" />
                        ))}
                    </button>
                </CollapsibleTrigger>
                <CollapsibleContent className={`${collapsed ? 'pl-0' : 'pl-4'} mt-1 space-y-1`}>
                    {items.map(renderNavItem)}
                </CollapsibleContent>
            </Collapsible>
        );
    };

    const renderSectionHeader = (title: string) => (
        <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
            {title}
        </p>
    );

    // ==================== MAIN RENDER ====================

    return (
        <div className={`flex h-full flex-col bg-white text-gray-900 border-r border-gray-200 transition-[width] duration-200 ${collapsed ? 'w-20' : 'w-64'}`}>
            {/* Logo */}
            <div className="flex h-16 items-center justify-between px-4 border-b border-gray-200">
                <div className="flex items-center gap-2">
                    <img
                        src="/logo.jpg"
                        alt="Dutu Pulmo"
                        className="h-16 w-16 rounded-md object-cover"
                    />
                    <div className={`${textBaseClass} ${textClass}`}>
                        <h1 className="text-lg font-bold text-gray-900">Dutu Pulmo</h1>
                        <p className="text-xs text-gray-500">Cổng Bác Sĩ</p>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <ScrollArea className="flex-1">
                <nav className="space-y-1 px-2 py-4">
                    {/* 1. Tổng Quan */}
                    <div className="space-y-1">
                        {overviewNav.map(renderNavItem)}
                    </div>

                    {/* 2. Phòng Khám */}
                    <div className="pt-4">
                        {!collapsed && renderSectionHeader('Phòng Khám')}
                        {renderCollapsibleSection('Khám Bệnh', 'phongKham', ClipboardListIcon, phongKhamNav)}
                    </div>

                    {/* 3. Tư Vấn Trực Tuyến */}
                    <div className="pt-4">
                        {!collapsed && renderSectionHeader('Tư Vấn Trực Tuyến')}
                        {renderCollapsibleSection('Video & Chat', 'tuVan', VideoCallIcon, tuVanNav)}
                    </div>

                    {/* 4. Đặt Khám Thông Minh */}
                    <div className="pt-4">
                        {!collapsed && renderSectionHeader('Đặt Khám')}
                        {renderCollapsibleSection('Lịch Hẹn', 'datKham', CalendarIcon, datKhamNav)}
                    </div>

                    {/* 5. Hồ Sơ */}
                    <div className="pt-4">
                        {!collapsed && renderSectionHeader('Hồ Sơ')}
                        {renderCollapsibleSection('Bệnh Án & BN', 'hoSo', FolderIcon, hoSoNav)}
                    </div>

                    {/* 6. Cận Lâm Sàng */}
                    <div className="pt-4">
                        {!collapsed && renderSectionHeader('Cận Lâm Sàng')}
                        {renderCollapsibleSection('Chẩn Đoán', 'canLamSang', AIBrainIcon, canLamSangNav)}
                    </div>

                    {/* 7. Thuốc & Điều Trị */}
                    <div className="pt-4">
                        {!collapsed && renderSectionHeader('Thuốc & Điều Trị')}
                        {renderCollapsibleSection('Tủ Thuốc', 'thuoc', PillIcon, thuocNav)}
                    </div>

                    {/* 8. Báo Cáo */}
                    <div className="pt-4">
                        {!collapsed && renderSectionHeader('Báo Cáo')}
                        {renderCollapsibleSection('Thống Kê', 'baoCao', ReportIcon, baoCaoNav)}
                    </div>

                    {/* Thông Tin */}
                    <div className="pt-4 border-t border-gray-100 mt-4">
                        <Link
                            to="/doctor/help"
                            className={`flex items-center rounded-lg px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors ${collapsed ? 'justify-center' : 'gap-3'}`}
                        >
                            <HelpIcon className="h-4 w-4" />
                            <span className={`${textBaseClass} ${textClass}`}>Hướng dẫn sử dụng</span>
                        </Link>
                        <Link
                            to="/doctor/about"
                            className={`flex items-center rounded-lg px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors ${collapsed ? 'justify-center' : 'gap-3'}`}
                        >
                            <InfoIcon className="h-4 w-4" />
                            <span className={`${textBaseClass} ${textClass}`}>Về Dutu Pulmo</span>
                        </Link>
                    </div>
                </nav>
            </ScrollArea>

        </div>
    );
}
