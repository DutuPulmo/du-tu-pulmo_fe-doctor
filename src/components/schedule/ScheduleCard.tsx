import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, Calendar } from 'lucide-react';
import type { DoctorSchedule } from '@/types/schedule';
import {
    DAYS_OF_WEEK,
    SCHEDULE_TYPE_LABELS,
    APPOINTMENT_TYPE_LABELS,
} from '@/lib/constants';

interface ScheduleCardProps {
    schedule: DoctorSchedule;
    onEdit: (schedule: DoctorSchedule) => void;
    onDelete: (schedule: DoctorSchedule) => void;
    onGenerateSlots?: (schedule: DoctorSchedule) => void;
}

export function ScheduleCard({ schedule, onEdit, onDelete, onGenerateSlots }: ScheduleCardProps) {
    const dayLabel = DAYS_OF_WEEK.find((d) => d.value === schedule.dayOfWeek)?.label || '';
    const scheduleTypeLabel = SCHEDULE_TYPE_LABELS[schedule.scheduleType];
    const appointmentTypeLabel = APPOINTMENT_TYPE_LABELS[schedule.appointmentType];

    return (
        <Card>
            <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                    <div className="space-y-1">
                        <CardTitle className="text-lg">{dayLabel}</CardTitle>
                        <div className="flex gap-2">
                            <Badge variant="outline">{scheduleTypeLabel}</Badge>
                            <Badge variant="secondary">{appointmentTypeLabel}</Badge>
                            {!schedule.isAvailable && <Badge variant="destructive">Không khả dụng</Badge>}
                        </div>
                    </div>
                    <div className="flex gap-2">
                        {onGenerateSlots && schedule.scheduleType === 'REGULAR' && (
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() => onGenerateSlots(schedule)}
                                title="Tạo time slots"
                            >
                                <Calendar className="h-4 w-4" />
                            </Button>
                        )}
                        <Button variant="outline" size="icon" onClick={() => onEdit(schedule)}>
                            <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" onClick={() => onDelete(schedule)}>
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                    <span className="text-gray-600">Thời gian:</span>
                    <span className="font-medium">
                        {schedule.startTime} - {schedule.endTime}
                    </span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-600">Thời lượng slot:</span>
                    <span className="font-medium">{schedule.slotDuration} phút</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-600">Sức chứa:</span>
                    <span className="font-medium">{schedule.slotCapacity} bệnh nhân/slot</span>
                </div>
                {schedule.consultationFee && (
                    <div className="flex justify-between">
                        <span className="text-gray-600">Phí khám:</span>
                        <span className="font-medium">{Number(schedule.consultationFee).toLocaleString()} VNĐ</span>
                    </div>
                )}
                {schedule.effectiveFrom && (
                    <div className="flex justify-between">
                        <span className="text-gray-600">Hiệu lực từ:</span>
                        <span className="font-medium">{schedule.effectiveFrom}</span>
                    </div>
                )}
                {schedule.effectiveUntil && (
                    <div className="flex justify-between">
                        <span className="text-gray-600">Hiệu lực đến:</span>
                        <span className="font-medium">{schedule.effectiveUntil}</span>
                    </div>
                )}
                {schedule.description && (
                    <div className="pt-2 border-t">
                        <p className="text-gray-600 text-xs">{schedule.description}</p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
