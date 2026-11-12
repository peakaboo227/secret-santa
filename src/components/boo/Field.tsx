// Port of Pawker.Field. Spec: design-system/components/Field/README.md
import type { InputHTMLAttributes } from "react";
import { cx } from "./cx";

export interface FieldProps extends InputHTMLAttributes<HTMLInputElement> {
  /** A required field that is still empty when its CTA was pressed. */
  invalid?: boolean;
}

export function Field({ invalid, className, type = "text", ...rest }: FieldProps) {
  return (
    <input
      type={type}
      className={cx("pk-field", invalid && "pk-field-invalid", className)}
      aria-invalid={invalid ? "true" : undefined}
      {...rest}
    />
  );
}
