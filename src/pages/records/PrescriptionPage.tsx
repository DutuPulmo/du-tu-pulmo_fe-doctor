import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '@/components/layout/PageHeader';
import { useMyPrescriptions } from '@/hooks/use-medical';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    Card,
    CardContent,
} from '@/components/ui/card';
import { 
    Search, 
    Pill, 
    User, 
    Eye, 
    Printer,
    Filter,
    Plus,
    Clock
} from 'lucide-react';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { Skeleton } from '@/components/ui/skeleton';

export default function PrescriptionPage() {
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const { data: prescriptions, isLoading } = useMyPrescriptions();

    const filteredPrescriptions = prescriptions?.filter((prescription) => {
        const searchLower = search.toLowerCase();
        const patientName = (prescription.patient as { user?: { fullName: string } })?.user?.fullName || 
                           (prescription.patient as { fullName?: string })?.fullName || '';

        return (
            (patientName && patientName.toLowerCase().includes(searchLower)) ||
            prescription.prescriptionNumber?.toLowerCase().includes(searchLower) ||
            prescription.diagnosis?.toLowerCase().includes(searchLower)
        );
    }) || [];



    return (
        <div className="space-y-4 animate-in fade-in duration-700">
            <PageHeader
                title="Đơn thuốc"
                subtitle="Quản lý và tra cứu danh sách các đơn thuốc đã kê cho bệnh nhân."
            />

            <Card className="border-none shadow-sm bg-gray-50/50 slide-in-from-top-2 animate-in duration-500">
                <CardContent className="p-4 flex flex-wrap items-end gap-3">
                    <div className="flex-1 min-w-[240px]">
                        <div className="relative">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                            <Input
                                placeholder="Tìm tên bệnh nhân, mã đơn, chẩn đoán..."
                                className="pl-9 bg-white h-9 text-sm"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                    </div>

                    <Button 
                        variant="outline" 
                        className="gap-2 h-9 px-3 text-sm bg-white"
                        onClick={() => setSearch("")}
                    >
                        <Filter className="h-3.5 w-3.5" />
                        Làm mới
                    </Button>

                    <Button className="gap-2 h-9 px-4 text-sm bg-blue-600 hover:bg-blue-700">
                        <Plus className="h-4 w-4" />
                        Tạo đơn thuốc
                    </Button>
                </CardContent>
            </Card>

            <div className="rounded-md border bg-white shadow-sm overflow-hidden slide-in-from-bottom-4 animate-in duration-700 delay-150">
                <Table>
                    <TableHeader className="bg-gray-50/50">
                        <TableRow>
                            <TableHead className="w-[150px] text-[11px] uppercase font-semibold text-gray-500">Mã đơn thuốc</TableHead>
                            <TableHead className="w-[180px] text-[11px] uppercase font-semibold text-gray-500 text-center">Ngày kê đơn</TableHead>
                            <TableHead className="text-[11px] uppercase font-semibold text-gray-500">Bệnh nhân</TableHead>
                            <TableHead className="text-[11px] uppercase font-semibold text-gray-500">Chẩn đoán</TableHead>
                            <TableHead className="w-[140px] text-[11px] uppercase font-semibold text-gray-500">Trạng thái</TableHead>
                            <TableHead className="w-[100px]"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            Array.from({ length: 5 }).map((_, i) => (
                                <TableRow key={i}>
                                    <TableCell colSpan={6} className="py-4">
                                        <div className="flex items-center space-x-3">
                                            <Skeleton className="h-4 w-[120px]" />
                                            <Skeleton className="h-4 w-[150px]" />
                                            <Skeleton className="h-4 w-[200px]" />
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : filteredPrescriptions.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="h-64 text-center">
                                    <div className="flex flex-col items-center justify-center space-y-3">
                                        <div className="w-32 h-32 bg-gray-50 rounded-full flex items-center justify-center">
                                            <Pill className="h-12 w-12 text-gray-200" />
                                        </div>
                                        <p className="text-gray-400 font-medium text-sm">
                                            Không tìm thấy đơn thuốc nào
                                        </p>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredPrescriptions.map((prescription) => (
                                <TableRow
                                    key={prescription.id}
                                    className="hover:bg-blue-50/30 transition-colors cursor-pointer text-sm"
                                    onClick={() => navigate(`/doctor/prescriptions/${prescription.id}`)}
                                >
                                    <TableCell className="py-3 font-mono text-xs text-blue-600">
                                        {prescription.prescriptionNumber}
                                    </TableCell>
                                    <TableCell className="py-3 text-center text-gray-600 whitespace-nowrap">
                                        <div className="flex items-center justify-center gap-1.5">
                                            <Clock className="h-3.5 w-3.5 text-gray-400" />
                                            {format(new Date(prescription.createdAt), 'dd/MM/yyyy HH:mm', { locale: vi })}
                                        </div>
                                    </TableCell>
                                    <TableCell className="py-3">
                                        <div className="flex items-center gap-2">
                                            <div className="w-7 h-7 rounded-full bg-emerald-50 flex items-center justify-center">
                                                <User className="h-3.5 w-3.5 text-emerald-500" />
                                            </div>
                                            <span className="font-medium text-gray-900 hover:text-blue-600 hover:underline">
                                                {(prescription.patient as { user?: { fullName: string } })?.user?.fullName || 
                                                 (prescription.patient as { fullName?: string })?.fullName || '—'}
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="py-3">
                                        <span className="line-clamp-1 text-gray-600 italic" title={prescription.diagnosis || ''}>
                                            {prescription.diagnosis || 'Chưa ghi nhận chẩn đoán'}
                                        </span>
                                    </TableCell>
                                    <TableCell className="py-3">
                                        {prescription.status === 'FILLED' ? (
                                            <span className="inline-flex items-center gap-1.5 px-2 py-1 text-green-700 bg-green-50 rounded-md font-medium text-[11px]">
                                                <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                                                Đã cấp thuốc
                                            </span>
                                        ) : prescription.status === 'CANCELLED' ? (
                                            <span className="inline-flex items-center gap-1.5 px-2 py-1 text-red-600 bg-red-50 rounded-md font-medium text-[11px]">
                                                <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                                                Đã hủy
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1.5 px-2 py-1 text-blue-600 bg-blue-50 rounded-md font-medium text-[11px]">
                                                <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                                                Hoạt động
                                            </span>
                                        )}
                                    </TableCell>
                                    <TableCell className="py-3">
                                        <div className="flex justify-end gap-1">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    window.open(`/api/medical/prescriptions/${prescription.id}/pdf`, '_blank');
                                                }}
                                            >
                                                <Printer className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400">
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
