import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { UseFormRegister, FieldErrors } from "react-hook-form";
import type { FormInputs } from "./types";

interface SearchFormProps {
  isLoading: boolean;
  register: UseFormRegister<FormInputs>;
  errors: FieldErrors<FormInputs>;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
}

export function SearchForm({ isLoading, register, errors, onSubmit }: SearchFormProps) {
  return (
    <div className="space-y-4">
      <form onSubmit={onSubmit} className="flex gap-2">
        <div className="flex-1">
          <Input
            {...register("from", {
              maxLength: { value: 4, message: "Max 4 karakter" },
              minLength: { value: 4, message: "Tam 4 karakter gerekli" },
              required: "Kalkış havaalanı gerekli",
              pattern: {
                value: /^[A-Z0-9]*$/,
                message: "Sadece büyük harfler ve rakamlar",
              },
            })}
            placeholder="Kalkış ICAO (örn: LTAC)"
            disabled={isLoading}
            maxLength={4}
          />
        </div>
        <div className="flex-1">
          <Input
            {...register("to", {
              maxLength: { value: 4, message: "Max 4 karakter" },
              minLength: { value: 4, message: "Tam 4 karakter gerekli" },
              required: "Varış havaalanı gerekli",
              pattern: {
                value: /^[A-Z0-9]*$/,
                message: "Sadece büyük harfler ve rakamlar",
              },
            })}
            placeholder="Varış ICAO (örn: LTAJ)"
            disabled={isLoading}
            maxLength={4}
          />
        </div>
        <Button
          type="submit"
          disabled={isLoading || Object.keys(errors).length > 0}
        >
          {isLoading ? "Aranıyor..." : "ARA"}
        </Button>
      </form>

      {Object.keys(errors).length > 0 && (
        <div className="text-red-500 text-sm space-y-1 bg-red-50 p-3 rounded">
          {errors.from && <p>• {errors.from.message}</p>}
          {errors.to && <p>• {errors.to.message}</p>}
        </div>
      )}
    </div>
  );
}
