import { createContext, useContext, useState } from "react";
import { ContactFormOverlay } from "./ContactFormOverlay";

const ContactFormContext = createContext<{ open: () => void }>({ open: () => {} });

export function useContactForm() {
  return useContext(ContactFormContext);
}

export function ContactFormProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ContactFormContext.Provider value={{ open: () => setIsOpen(true) }}>
      {children}
      {/* Rendered here at the very root — no transforms, no stacking context issues */}
      <ContactFormOverlay open={isOpen} onClose={() => setIsOpen(false)} />
    </ContactFormContext.Provider>
  );
}
