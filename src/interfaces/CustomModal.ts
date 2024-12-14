export interface ShareModalProps {
    isOpen: boolean;
    link: string;
    onClose: () => void;
    onShare: (platform: string, link: string) => void;
  }
  