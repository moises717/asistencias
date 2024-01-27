'use client';

import * as React from 'react';
import { CalendarIcon } from '@radix-ui/react-icons';
import { addDays, format } from 'date-fns';
import { DateRange } from 'react-day-picker';
import { es } from 'date-fns/locale';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

export function DatePickerWithRange({ className, onChange }: { className?: string; onChange?: (date: DateRange) => void }) {
	const cdate = new Date();
	const [date, setDate] = React.useState<DateRange | undefined>({
		from: new Date(cdate.getFullYear(), cdate.getMonth(), 1),
		to: addDays(new Date(cdate.getFullYear(), cdate.getMonth() + 1, 1), -1),
	});

	React.useEffect(() => {
		if (!date) return;

		onChange?.(date);
	}, [date]);

	return (
		<div className={cn('grid gap-2', className)}>
			<Popover>
				<PopoverTrigger asChild>
					<Button id='date' variant={'outline'} className={cn(' text-left font-normal', !date && 'text-muted-foreground')}>
						<CalendarIcon className='mr-2 h-4 w-4' />
						{date?.from ? (
							date.to ? (
								<>
									{format(date.from, 'L, d, y', { locale: es })} - {format(date.to, 'L, d, y', { locale: es })}
								</>
							) : (
								format(date.from, 'L, d, y', { locale: es })
							)
						) : (
							<span>Seleccione una fecha</span>
						)}
					</Button>
				</PopoverTrigger>
				<PopoverContent className='w-auto p-0' align='center'>
					<Calendar initialFocus locale={es} mode='range' defaultMonth={date?.from} selected={date} onSelect={setDate} numberOfMonths={2} />
				</PopoverContent>
			</Popover>
		</div>
	);
}
