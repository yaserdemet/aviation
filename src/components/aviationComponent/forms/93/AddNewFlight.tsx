import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm, Controller } from "react-hook-form";
import type { Flight } from "./data";

interface AddNewFlightProps {
  flights: Flight[];
  setFlights: React.Dispatch<React.SetStateAction<Flight[]>>;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type FlightFormData = Omit<Flight, "inAir"> & { inAir: string };

const AddNewFlight = ({ flights, setFlights, open, onOpenChange }: AddNewFlightProps) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FlightFormData>();

  const onSubmit = (data: FlightFormData) => {
    const formattedData: Flight = {
      ...data,
      inAir: data.inAir === "true",
    };

    setFlights([formattedData, ...flights]);
    reset();
    onOpenChange(false);
  };

  return (
    <div className="m-4">
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogTrigger asChild>
          <Button className="rounded-xl shadow-lg border-none bg-blue-500 hover:bg-blue-600 text-white">
            <Plus className="w-4 h-4 mr-2" /> Uçuş Ekle
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md max-h-[90vh] flex flex-col rounded-2xl border-none shadow-2xl bg-card overflow-hidden">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col h-full">
            <DialogHeader className="shrink-0 pb-2">
              <DialogTitle className="text-xl font-bold tracking-tight text-foreground/80">
                Yeni Uçuş Kaydı
              </DialogTitle>
              <DialogDescription className="text-xs italic text-muted-foreground">
                Form 93 standartlarına uygun yeni uçuş verisi ekleyin.
              </DialogDescription>
            </DialogHeader>

            <div className="flex-1 overflow-y-auto pr-2 -mr-2 px-1">
              <div className="grid grid-cols-2 gap-4 py-4">
                <FieldGroup className="col-span-2">
                  <Field>
                    <FieldLabel htmlFor="callSign">Çağrı Kodu</FieldLabel>
                    <Input
                      {...register("callSign", { required: true, minLength: 3 })}
                      id="callSign"
                      placeholder="TC001"
                      className="rounded-lg bg-muted/20 border-none"
                    />
                    {errors.callSign && (
                      <span className="text-[10px] text-red-500 font-medium">
                        En az 3 karakter gereklidir.
                      </span>
                    )}
                  </Field>
                </FieldGroup>

                <Field>
                  <FieldLabel htmlFor="aircraftType">Uçak Tipi</FieldLabel>
                  <Input
                    {...register("aircraftType", { required: true, minLength: 3 })}
                    id="aircraftType"
                    placeholder="Cessna 172"
                    className="rounded-lg bg-muted/20 border-none"
                  />
                  {errors.aircraftType && (
                    <span className="text-[10px] text-red-500 font-medium italic">
                      En az 3 karakter gereklidir.
                    </span>
                  )}
                </Field>

                <Field>
                  <FieldLabel htmlFor="squawk">Squawk</FieldLabel>
                  <Input
                    {...register("squawk", { required: true, minLength: 4 })}
                    id="squawk"
                    placeholder="7000"
                    className="rounded-lg bg-muted/20 border-none"
                  />
                  {errors.squawk && (
                    <span className="text-[10px] text-red-500 font-medium italic">
                      4 haneli kod gereklidir.
                    </span>
                  )}
                </Field>

                <Field>
                  <FieldLabel htmlFor="departure">Kalkış</FieldLabel>
                  <Input
                    {...register("departure", { required: true, minLength: 4 })}
                    id="departure"
                    placeholder="LTBA"
                    className="rounded-lg bg-muted/20 border-none"
                  />
                  {errors.departure && (
                    <span className="text-[10px] text-red-500 font-medium italic">
                      Geçerli bir ICAO kodu giriniz.
                    </span>
                  )}
                </Field>

                <Field>
                  <FieldLabel htmlFor="arrival">Varış</FieldLabel>
                  <Input
                    {...register("arrival", { required: true, minLength: 4 })}
                    id="arrival"
                    placeholder="LTAC"
                    className="rounded-lg bg-muted/20 border-none"
                  />
                  {errors.arrival && (
                    <span className="text-[10px] text-red-500 font-medium italic">
                      Geçerli bir ICAO kodu giriniz.
                    </span>
                  )}
                </Field>

                <Field>
                  <FieldLabel htmlFor="flightType">Uçuş Tipi</FieldLabel>
                  <Controller
                    name="flightType"
                    control={control}
                    rules={{ required: true }}
                    defaultValue="VFR"
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger className="rounded-lg bg-muted/20 border-none">
                          <SelectValue placeholder="Seçiniz" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="VFR">VFR</SelectItem>
                          <SelectItem value="IFR">IFR</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.flightType && <span className="text-[10px] text-red-500 font-medium italic">Gereklidir.</span>}
                </Field>

                <Field>
                  <FieldLabel htmlFor="inAir">Havada Mı?</FieldLabel>
                  <Controller
                    name="inAir"
                    control={control}
                    rules={{ required: true }}
                    defaultValue="true"
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger className="rounded-lg bg-muted/20 border-none">
                          <SelectValue placeholder="Seçiniz" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="true">Evet</SelectItem>
                          <SelectItem value="false">Hayır</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.inAir && <span className="text-[10px] text-red-500 font-medium italic">Gereklidir.</span>}
                </Field>

                <FieldGroup className="col-span-2">
                  <Field>
                    <FieldLabel htmlFor="flightPurpose">Uçuş Amacı</FieldLabel>
                    <Input
                      {...register("flightPurpose", { required: true })}
                      id="flightPurpose"
                      placeholder="Eğitim / Test"
                      className="rounded-lg bg-muted/20 border-none"
                    />
                    {errors.flightPurpose && (
                      <span className="text-[10px] text-red-500 font-medium italic">
                        Uçuş amacı belirtilmelidir.
                      </span>
                    )}
                  </Field>
                </FieldGroup>
              </div>
            </div>

            <DialogFooter className="shrink-0 gap-2 pt-4 border-t border-slate-100/50 mt-auto">
              <DialogClose asChild>
                <Button
                  onClick={() => reset()}
                  type="button"
                  variant="outline"
                  className="rounded-xl border-slate-200"
                >
                  İptal
                </Button>
              </DialogClose>
              <Button
                type="submit"
                className="rounded-xl bg-blue-500 hover:bg-blue-600 text-white border-none shadow-md"
              >
                Kaydet
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddNewFlight;
