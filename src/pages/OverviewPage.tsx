import { PageHeader } from '@/components/layout/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function OverviewPage() {
    return (
        <div className="space-y-6">
            <PageHeader
                title="Tổng quan"
                subtitle="Chào mừng trở lại, Bác sĩ Demo"
            />
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Bệnh nhân đang chờ</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">4</div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
