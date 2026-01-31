import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { AppointmentType, APPOINTMENT_TYPE_LABELS } from '@/lib/constants';
import type { TimeSlot, CreateTimeSlotDto } from '@/types/timeslot';

interface TimeSlotFormProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: CreateTimeSlotDto) => void;
    slot?: TimeSlot | null;
}

export function TimeSlotForm({ open, onClose, onSubmit, slot }: TimeSlotFormProps) {
    const [formData, setFormData] = useState<CreateTimeSlotDto>({
        startTime: '',
        endTime: '',
        allowedAppointmentTypes: [AppointmentType.IN_CLINIC],
        capacity: 1,
        isAvailable: true,
    });

    useEffect(() => {
        if (slot) {
            setFormData({
                startTime: slot.startTime,
                endTime: slot.endTime,
                allowedAppointmentTypes: slot.allowedAppointmentTypes,
                capacity: slot.capacity,
                isAvailable: slot.isAvailable,
            });
        } else {
            setFormData({
                startTime: '',
                endTime: '',
                allowedAppointmentTypes: [AppointmentType.IN_CLINIC],
                capacity: 1,
                isAvailable: true,
            });
        }
    }, [slot, open]);


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const handleAppointmentTypeToggle = (type: AppointmentType, checked: boolean) => {
        if (checked) {
            setFormData({
                ...formData,
                allowedAppointmentTypes: [...formData.allowedAppointmentTypes, type],
            });
        } else {
            setFormData({
                ...formData,
                allowedAppointmentTypes: formData.allowedAppointmentTypes.filter((t) => t !== type),
            });
        }
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>{slot ? 'Cập Nhật' : 'Tạo'} Time Slot</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="startTime">Thời gian bắt đầu</Label>
                        <Input
                            id="startTime"
                            type="datetime-local"
                            value={formData.startTime}
                            onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="endTime">Thời gian kết thúc</Label>
                        <Input
                            id="endTime"
                            type="datetime-local"
                            value={formData.endTime}
                            onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="capacity">Sức chứa (bệnh nhân)</Label>
                        <Input
                            id="capacity"
                            type="number"
                            min="1"
                            max="10"
                            value={formData.capacity}
                            onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) })}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Loại hình khám được phép</Label>
                        <div className="space-y-2">
                            {Object.values(AppointmentType).map((type) => (
                                <div key={type} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={type}
                                        checked={formData.allowedAppointmentTypes.includes(type)}
                                        onCheckedChange={(checked) =>
                                            handleAppointmentTypeToggle(type, checked as boolean)
                                        }
                                    />
                                    <Label htmlFor={type} className="font-normal cursor-pointer">
                                        {APPOINTMENT_TYPE_LABELS[type]}
                                    </Label>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="isAvailable"
                            checked={formData.isAvailable}
                            onCheckedChange={(checked) =>
                                setFormData({ ...formData, isAvailable: checked as boolean })
                            }
                        />
                        <Label htmlFor="isAvailable" className="font-normal cursor-pointer">
                            Khả dụng
                        </Label>
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={onClose}>
                            Hủy
                        </Button>
                        <Button type="submit">{slot ? 'Cập Nhật' : 'Tạo Mới'}</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
