import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, ToggleLeft, ToggleRight } from 'lucide-react';
import type { TimeSlot } from '@/types/timeslot';
import { APPOINTMENT_TYPE_LABELS } from '@/lib/constants';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';

interface TimeSlotCardProps {
    slot: TimeSlot;
    onEdit: (slot: TimeSlot) => void;
    onDelete: (slot: TimeSlot) => void;
    onToggleAvailability: (slot: TimeSlot) => void;
}

export function TimeSlotCard({ slot, onEdit, onDelete, onToggleAvailability }: TimeSlotCardProps) {
    const startTime = new Date(slot.startTime);
    const endTime = new Date(slot.endTime);

    return (
        <Card>
            <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                    <div className="space-y-1">
                        <CardTitle className="text-lg">
                            {format(startTime, 'HH:mm', { locale: vi })} - {format(endTime, 'HH:mm', { locale: vi })}
                        </CardTitle>
                        <div className="flex gap-2">
                            {slot.isAvailable ? (
                                <Badge variant="default">Khả dụng</Badge>
                            ) : (
                                <Badge variant="secondary">Không khả dụng</Badge>
                            )}
                            {slot.bookedCount > 0 && (
                                <Badge variant="outline">Đã đặt: {slot.bookedCount}/{slot.capacity}</Badge>
                            )}
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => onToggleAvailability(slot)}
                            title={slot.isAvailable ? 'Tắt khả dụng' : 'Bật khả dụng'}
                        >
                            {slot.isAvailable ? (
                                <ToggleRight className="h-4 w-4" />
                            ) : (
                                <ToggleLeft className="h-4 w-4" />
                            )}
                        </Button>
                        <Button variant="outline" size="icon" onClick={() => onEdit(slot)}>
                            <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => onDelete(slot)}
                            disabled={slot.bookedCount > 0}
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                    <span className="text-gray-600">Ngày:</span>
                    <span className="font-medium">{format(startTime, 'dd/MM/yyyy', { locale: vi })}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-600">Sức chứa:</span>
                    <span className="font-medium">{slot.capacity} bệnh nhân</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-600">Đã đặt:</span>
                    <span className="font-medium">{slot.bookedCount} bệnh nhân</span>
                </div>
                <div className="pt-2 border-t">
                    <p className="text-gray-600 text-xs mb-1">Loại hình khám:</p>
                    <div className="flex flex-wrap gap-1">
                        {slot.allowedAppointmentTypes.map((type) => (
                            <Badge key={type} variant="outline" className="text-xs">
                                {APPOINTMENT_TYPE_LABELS[type]}
                            </Badge>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
