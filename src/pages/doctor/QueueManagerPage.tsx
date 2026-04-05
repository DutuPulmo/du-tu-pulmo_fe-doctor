import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '@/components/layout/PageHeader';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { format } from 'date-fns';
import { QueueCard } from '@/components/queue/QueueCard';
import {
    useGetMyQueue,
    useGetMyAppointmentsAsDoctor,
} from '@/hooks/use-appointments';
import { useEncounterActions } from '@/hooks/use-encounter-actions';
import type { Appointment } from '@/types/appointment';
import { AppointmentStatus } from '@/types/appointment';
import {
    Users,
    Clock,
    Stethoscope,
    CheckCircle2,
    Search,
    RefreshCw,
} from 'lucide-react';

export default function QueueManagerPage() {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const { startExamAsync, checkInAsync } = useEncounterActions();

    // ─── Data sources ────────────────────────────────────────────────────────

    // Nguồn 1: Hàng đợi hôm nay (CONFIRMED, CHECKED_IN, IN_PROGRESS)
    const {
        data: todayQueue,
        isLoading: isQueueLoading,
        isFetching,
        refetch,
    } = useGetMyQueue();

    // Nguồn 2: Các ca đã hoàn thành HÔM NAY (filter theo ngày)
    const today = new Date();
    const todayStr = format(today, 'yyyy-MM-dd');

    const { data: completedTodayData, isLoading: isCompletedLoading } =
        useGetMyAppointmentsAsDoctor({
            page: 1,
            limit: 50,
            status: AppointmentStatus.COMPLETED,
            startDate: todayStr,
            endDate: todayStr,
        });

    // ─── Derived state — tất cả lấy từ đúng nguồn ───────────────────────────

    // Kanban columns — từ todayQueue
    const upcomingTodayItems: Appointment[] = todayQueue?.upcomingToday ?? [];   // CONFIRMED
    const checkedInItems: Appointment[]     = todayQueue?.waitingQueue   ?? [];   // CHECKED_IN
    const inProgressItems: Appointment[]    = todayQueue?.inProgress     ?? [];   // IN_PROGRESS

    // Cột "Đang chờ" = CHECKED_IN + CONFIRMED
    const waitingItems: Appointment[] = [...checkedInItems, ...upcomingTodayItems];

    // Cột "Đã khám" — từ completedTodayData (filter hôm nay)
    const completedTodayItems: Appointment[] = completedTodayData?.items ?? [];

    // ─── Stats cards — tất cả scope HÔM NAY ─────────────────────────────────

    // Tổng hôm nay = tất cả nhóm cộng lại
    const totalTodayCount =
        waitingItems.length + inProgressItems.length + completedTodayItems.length;

    const waitingCount     = waitingItems.length;
    const inProgressCount  = inProgressItems.length;
    const completedCount   = completedTodayItems.length;

    // ─── Helpers ─────────────────────────────────────────────────────────────

    const getEncounterRoute = (id: string, type?: string) =>
        type === 'VIDEO'
            ? `/doctor/encounters/${id}/video`
            : `/doctor/encounters/${id}/in-clinic`;

    const handleStartExam = async (id: string, appointmentType?: string) => {
        try {
            if (appointmentType === 'VIDEO') {
                await checkInAsync(id);
                navigate(getEncounterRoute(id, 'VIDEO'));
            } else {
                await startExamAsync({ id, type: appointmentType });
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleComplete    = (id: string, type?: string) => navigate(getEncounterRoute(id, type));
    const handleViewDetails = (id: string) => navigate(`/doctor/appointments/${id}`);
    const handleOpenRecord  = (id: string, type?: string) => navigate(getEncounterRoute(id, type));

    const getPatientName = (a: Appointment) => a.patient?.user?.fullName ?? '';

    const filterItems = (items: Appointment[]) => {
        if (!searchQuery.trim()) return items;
        const q = searchQuery.toLowerCase();
        return items.filter((item) => {
            const name      = getPatientName(item).toLowerCase();
            const reason    = (item.chiefComplaint ?? '').toLowerCase();
            const queueNum  = item.queueNumber?.toString() ?? '';
            const code      = item.patient?.profileCode?.toLowerCase() ?? '';
            return name.includes(q) || reason.includes(q) || queueNum.includes(q) || code.includes(q);
        });
    };

    // ─── Loading state ────────────────────────────────────────────────────────

    if (isQueueLoading || isCompletedLoading) {
        return (
            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <Skeleton className="h-8 w-48" />
                    <Skeleton className="h-10 w-32" />
                </div>
                <div className="grid grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                        <Skeleton key={i} className="h-24 w-full rounded-lg" />
                    ))}
                </div>
                <div className="grid grid-cols-3 gap-6">
                    {[1, 2, 3].map((i) => (
                        <Skeleton key={i} className="h-96 w-full rounded-lg" />
                    ))}
                </div>
            </div>
        );
    }

    // ─── Render ───────────────────────────────────────────────────────────────

    return (
        <div className="h-[calc(100vh-4rem)] flex flex-col space-y-4 p-4">
            <PageHeader
                title="Quản Lý Hàng Đợi"
                subtitle={
                    <span className="text-gray-500">Phòng khám</span>
                }
                rightSlot={
                    <div className="flex items-center gap-2">
                        <div className="relative w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                                placeholder="Tìm kiếm tên, mã hồ sơ,..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-9 h-9"
                            />
                        </div>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => refetch()}
                            disabled={isFetching}
                        >
                            <RefreshCw className={`h-4 w-4 ${isFetching ? 'animate-spin' : ''}`} />
                        </Button>
                    </div>
                }
            />

            {/* ── Stats Overview — tất cả scope hôm nay ── */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {/* Tổng hôm nay */}
                <Card>
                    <CardContent className="p-4 flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">Tổng lượt khám</p>
                            <p className="text-2xl font-bold">{totalTodayCount}</p>
                            <p className="text-xs text-gray-500 mt-1">Hôm nay</p>
                        </div>
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <Users className="h-5 w-5 text-blue-600" />
                        </div>
                    </CardContent>
                </Card>

                {/* Đang chờ = CHECKED_IN + CONFIRMED */}
                <Card>
                    <CardContent className="p-4 flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">Đang chờ</p>
                            <p className="text-2xl font-bold">{waitingCount}</p>
                            <p className="text-xs text-gray-500 mt-1">
                                {checkedInItems.length} sẵn sàng · {upcomingTodayItems.length} đã xác nhận
                            </p>
                        </div>
                        <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center">
                            <Clock className="h-5 w-5 text-orange-600" />
                        </div>
                    </CardContent>
                </Card>

                {/* Đang khám = IN_PROGRESS */}
                <Card>
                    <CardContent className="p-4 flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">Đang khám</p>
                            <p className="text-2xl font-bold">{inProgressCount}</p>
                            <p className="text-xs text-gray-500 mt-1">
                                {inProgressItems[0]
                                    ? `${getPatientName(inProgressItems[0])} đang khám`
                                    : 'Trống'}
                            </p>
                        </div>
                        <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                            <Stethoscope className="h-5 w-5 text-purple-600" />
                        </div>
                    </CardContent>
                </Card>

                {/* Đã khám = COMPLETED hôm nay */}
                <Card>
                    <CardContent className="p-4 flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">Đã khám</p>
                            <p className="text-2xl font-bold">{completedCount}</p>
                            <p className="text-xs text-gray-500 mt-1">
                                {completedCount > 0
                                    ? `${completedCount} ca hoàn thành`
                                    : 'Chưa có ca hôm nay'}
                            </p>
                        </div>
                        <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                            <CheckCircle2 className="h-5 w-5 text-green-600" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* ── Kanban Columns ── */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4 min-h-0 pb-4">

                {/* Cột 1: Đang chờ (CHECKED_IN + CONFIRMED) */}
                <Card className="flex flex-col bg-gray-50/50 border-gray-200 h-full overflow-hidden">
                    <CardHeader className="py-3 px-4 border-b bg-white shrink-0">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 font-medium">
                                <span className="h-2 w-2 rounded-full bg-yellow-500" />
                                Đang chờ
                            </div>
                            <Badge variant="secondary" className="bg-gray-100">
                                {filterItems(waitingItems).length}
                            </Badge>
                        </div>
                    </CardHeader>
                    <ScrollArea className="flex-1 p-3">
                        <div className="pb-4">
                            {filterItems(waitingItems).length > 0 ? (
                                filterItems(waitingItems).map((item) => (
                                    <QueueCard
                                        key={item.id}
                                        item={item}
                                        onStartExam={(id) => handleStartExam(id, item.appointmentType)}
                                        onJoinVideo={(id) => handleStartExam(id, 'VIDEO')}
                                        onViewDetails={handleViewDetails}
                                        onOpenRecord={handleOpenRecord}
                                    />
                                ))
                            ) : (
                                <div className="text-center py-8 text-gray-400 text-sm">
                                    Không có bệnh nhân chờ
                                </div>
                            )}
                        </div>
                    </ScrollArea>
                </Card>

                {/* Cột 2: Đang khám (IN_PROGRESS) */}
                <Card className="flex flex-col bg-blue-50/30 border-blue-100 h-full overflow-hidden">
                    <CardHeader className="py-3 px-4 border-b bg-white shrink-0">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 font-medium text-blue-700">
                                <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                                Đang khám
                            </div>
                            <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200">
                                {filterItems(inProgressItems).length}
                            </Badge>
                        </div>
                    </CardHeader>
                    <ScrollArea className="flex-1 p-3">
                        <div className="pb-4">
                            {filterItems(inProgressItems).length > 0 ? (
                                filterItems(inProgressItems).map((item) => (
                                    <QueueCard
                                        key={item.id}
                                        item={item}
                                        onComplete={handleComplete}
                                        onOpenRecord={handleOpenRecord}
                                        onViewDetails={handleViewDetails}
                                    />
                                ))
                            ) : (
                                <div className="text-center py-8 text-gray-400 text-sm">
                                    Chưa có bệnh nhân đang khám
                                </div>
                            )}
                        </div>
                    </ScrollArea>
                </Card>

                {/* Cột 3: Đã khám (COMPLETED hôm nay) */}
                <Card className="flex flex-col bg-gray-50/50 border-gray-200 h-full overflow-hidden">
                    <CardHeader className="py-3 px-4 border-b bg-white shrink-0">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 font-medium text-gray-600">
                                <span className="h-2 w-2 rounded-full bg-gray-400" />
                                Đã khám
                            </div>
                            <Badge variant="outline">
                                {filterItems(completedTodayItems).length}
                            </Badge>
                        </div>
                    </CardHeader>
                    <ScrollArea className="flex-1 p-3">
                        <div className="pb-4">
                            {filterItems(completedTodayItems).length > 0 ? (
                                filterItems(completedTodayItems).map((item) => (
                                    <QueueCard
                                        key={item.id}
                                        item={item}
                                        onViewDetails={handleViewDetails}
                                        onOpenRecord={handleOpenRecord}
                                    />
                                ))
                            ) : (
                                <div className="text-center py-8 text-gray-400 text-sm">
                                    Chưa có bệnh nhân hoàn thành hôm nay
                                </div>
                            )}
                        </div>
                    </ScrollArea>
                </Card>

            </div>
        </div>
    );
}