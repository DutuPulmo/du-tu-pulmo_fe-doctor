import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Search,
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
    Users,
    Eye,
    Filter,
    MoreHorizontal,
} from 'lucide-react';
import { usePatients } from '@/hooks/use-patients';
import { Skeleton } from '@/components/ui/skeleton';

const BLOOD_TYPES = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

function formatDate(dateStr?: string) {
    if (!dateStr) return '—';
    const d = new Date(dateStr);
    return d.toLocaleDateString('vi-VN', { 
        day: '2-digit', 
        month: '2-digit', 
        year: 'numeric' 
    });
}

function getGenderBadge(gender?: string) {
    const baseClass = "text-[11px] px-2 h-6 whitespace-nowrap inline-flex items-center justify-center rounded-md font-medium transition-none";
    if (gender === 'MALE') {
        return (
            <Badge className={`bg-blue-50 text-blue-700 border-blue-200 ${baseClass}`}>
                Nam
            </Badge>
        );
    }
    if (gender === 'FEMALE') {
        return (
            <Badge className={`bg-pink-50 text-pink-700 border-pink-200 ${baseClass}`}>
                Nữ
            </Badge>
        );
    }
    return (
        <Badge className={`bg-gray-50 text-gray-700 border-gray-200 ${baseClass}`}>
            Khác
        </Badge>
    );
}

export const PatientListPage = () => {
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(20);
    const [search, setSearch] = useState('');
    const [bloodType, setBloodType] = useState<string>('all');

    const { data, isLoading } = usePatients({ 
        page, 
        limit, 
        search: search || undefined,
        bloodType: bloodType === 'all' ? undefined : bloodType
    });
    
    const patients = data?.items || [];
    const meta = data?.meta;

    return (
        <div className="space-y-4 animate-in fade-in duration-700">
            <PageHeader
                title="Danh sách bệnh nhân"
                subtitle="Quản lý thông tin chi tiết và hồ sơ bệnh án của bệnh nhân"
            />

            {/* Filters */}
            <Card className="border-none shadow-sm bg-gray-50/50 slide-in-from-top-2 animate-in duration-500">
                <CardContent className="p-4 flex flex-wrap items-end gap-3">
                    <div className="flex-1 min-w-[240px]">
                        <div className="relative">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                            <Input
                                placeholder="Tìm theo tên, số điện thoại, mã bệnh nhân..."
                                className="pl-9 bg-white h-9"
                                value={search}
                                onChange={(e) => {
                                    setSearch(e.target.value);
                                    setPage(1);
                                }}
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <span className="text-[11px] font-medium text-gray-500 ml-1">
                            Nhóm máu
                        </span>
                        <Select 
                            value={bloodType} 
                            onValueChange={(v) => {
                                setBloodType(v);
                                setPage(1);
                            }}
                        >
                            <SelectTrigger className="w-[130px] h-9 bg-white text-sm">
                                <SelectValue placeholder="Tất cả" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Tất cả</SelectItem>
                                {BLOOD_TYPES.map(type => (
                                    <SelectItem key={type} value={type}>{type}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex gap-2">
                        <Button 
                            variant="outline" 
                            className="gap-2 h-9 px-3 text-sm"
                            onClick={() => {
                                setSearch("");
                                setBloodType("all");
                                setPage(1);
                            }}
                        >
                            <Filter className="h-3.5 w-3.5" />
                            Làm mới
                        </Button>
                        <Button variant="outline" size="icon" className="h-9 w-9">
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Table */}
            <div className="rounded-md border bg-white shadow-sm overflow-hidden slide-in-from-bottom-4 animate-in duration-700 delay-150">
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader className="bg-gray-50/50">
                            <TableRow>
                                <TableHead className="w-[120px] text-[11px] uppercase font-semibold text-gray-500">Mã BN</TableHead>
                                <TableHead className="text-[11px] uppercase font-semibold text-gray-500">Họ và tên</TableHead>
                                <TableHead className="text-[11px] uppercase font-semibold text-gray-500">Giới tính</TableHead>
                                <TableHead className="text-[11px] uppercase font-semibold text-gray-500">Ngày sinh</TableHead>
                                <TableHead className="text-[11px] uppercase font-semibold text-gray-500">Điện thoại</TableHead>
                                <TableHead className="text-[11px] uppercase font-semibold text-gray-500">Nhóm máu</TableHead>
                                <TableHead className="w-[50px]"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isLoading ? (
                                Array.from({ length: 8 }).map((_, i) => (
                                    <TableRow key={i}>
                                        <TableCell colSpan={7} className="py-4">
                                            <div className="flex items-center space-x-3">
                                                <Skeleton className="h-4 w-[100px]" />
                                                <Skeleton className="h-4 w-[200px]" />
                                                <Skeleton className="h-4 w-[80px]" />
                                                <Skeleton className="h-4 w-[120px]" />
                                                <Skeleton className="h-4 w-[100px]" />
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : patients.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={7} className="h-64 text-center">
                                        <div className="flex flex-col items-center justify-center space-y-3">
                                            <div className="w-32 h-32 bg-gray-50 rounded-full flex items-center justify-center">
                                                <Users className="h-12 w-12 text-gray-200" />
                                            </div>
                                            <p className="text-gray-400 font-medium text-sm">
                                                Không tìm thấy bệnh nhân nào
                                            </p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                patients.map((patient) => (
                                    <TableRow
                                        key={patient.id}
                                        className="hover:bg-blue-50/30 transition-colors cursor-pointer text-sm"
                                        onClick={() => navigate(`/doctor/patients/${patient.id}`)}
                                    >
                                        <TableCell className="py-3 font-mono text-xs text-blue-600">
                                            {patient.profileCode ?? '—'}
                                        </TableCell>
                                        <TableCell className="py-3 font-medium whitespace-nowrap text-gray-900 hover:text-blue-600 hover:underline">
                                            {patient.user?.fullName ?? '—'}
                                        </TableCell>
                                        <TableCell className="py-3">
                                            {getGenderBadge(patient.user?.gender)}
                                        </TableCell>
                                        <TableCell className="py-3 text-gray-600">
                                            {formatDate(patient.user?.dateOfBirth)}
                                        </TableCell>
                                        <TableCell className="py-3 text-gray-600">
                                            {patient.user?.phone ?? '—'}
                                        </TableCell>
                                        <TableCell className="py-3">
                                            {patient.bloodType ? (
                                                <Badge variant="outline" className="text-red-600 border-red-200 bg-red-50/30 font-bold px-2 py-0.5">
                                                    {patient.bloodType}
                                                </Badge>
                                            ) : (
                                                <span className="text-gray-400">—</span>
                                            )}
                                        </TableCell>
                                        <TableCell className="py-3 text-right">
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400">
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between px-2 pt-2 pb-6">
                <div className="flex items-center gap-2">
                    <Select
                        value={String(limit)}
                        onValueChange={(v) => {
                            setLimit(Number(v));
                            setPage(1);
                        }}
                    >
                        <SelectTrigger className="w-[70px] bg-white h-8 text-[13px]">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="10">10</SelectItem>
                            <SelectItem value="20">20</SelectItem>
                            <SelectItem value="50">50</SelectItem>
                            <SelectItem value="100">100</SelectItem>
                        </SelectContent>
                    </Select>
                    <span className="text-[13px] text-gray-500">dòng</span>
                </div>

                <div className="flex items-center gap-4">
                    <span className="text-[13px] text-gray-600">
                        Trang{" "}
                        <span className="font-semibold text-gray-900">
                            {meta?.currentPage || 1}
                        </span>{" "}
                        / {meta?.totalPages || 1}
                    </span>
                    <div className="flex items-center gap-1">
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 bg-white border-gray-200"
                            onClick={() => setPage(1)}
                            disabled={!meta?.hasPreviousPage}
                        >
                            <ChevronsLeft className="h-4 w-4 text-gray-600" />
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 bg-white border-gray-200"
                            onClick={() => setPage((p) => p - 1)}
                            disabled={!meta?.hasPreviousPage}
                        >
                            <ChevronLeft className="h-4 w-4 text-gray-600" />
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 bg-white border-gray-200"
                            onClick={() => setPage((p) => p + 1)}
                            disabled={!meta?.hasNextPage}
                        >
                            <ChevronRight className="h-4 w-4 text-gray-600" />
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 bg-white border-gray-200"
                            onClick={() => setPage(meta?.totalPages || 1)}
                            disabled={!meta?.hasNextPage}
                        >
                            <ChevronsRight className="h-4 w-4 text-gray-600" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PatientListPage;
