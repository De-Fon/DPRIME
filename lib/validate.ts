// Utility validators for DPRIME

export function validateContactForm({
  name,
  email,
  message,
}: {
  name: string;
  email: string;
  message: string;
}): Record<string, string> {
  const errors: Record<string, string> = {};

  const trimmedName = name?.trim() ?? "";
  if (!trimmedName || trimmedName.length < 2) {
    errors.name = "Enter your name.";
  }

  const trimmedEmail = email?.trim() ?? "";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!trimmedEmail || !emailRegex.test(trimmedEmail)) {
    errors.email = "Enter a valid email address.";
  }

  const trimmedMessage = message?.trim() ?? "";
  if (!trimmedMessage || trimmedMessage.length < 10) {
    errors.message = "Tell us a bit more about the project (10+ characters).";
  }

  return errors;
}
