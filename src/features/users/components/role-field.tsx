// Pilihan role di form tambah & ubah pengguna (dropdown OptionSelect global).

import { OptionSelect } from "@/components/option-select";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { ROLE_LABELS, ROLES, type Role } from "@/lib/auth/roles";

const ROLE_OPTIONS = ROLES.map((role) => ({ value: role, label: ROLE_LABELS[role] }));

export function RoleField({ defaultValue, error }: { defaultValue?: Role; error?: string }) {
  return (
    <Field data-invalid={!!error}>
      <FieldLabel htmlFor="role">Role</FieldLabel>
      <OptionSelect
        id="role"
        name="role"
        options={ROLE_OPTIONS}
        defaultValue={defaultValue}
        placeholder="Pilih role"
        required
        aria-invalid={!!error}
      />
      <FieldError>{error}</FieldError>
    </Field>
  );
}
