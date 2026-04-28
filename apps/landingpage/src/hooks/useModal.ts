import { useState, useCallback, useEffect } from 'react';
import { ModalId } from '../types';

interface UseModalReturn {
  activeModal: ModalId | null;
  openModal: (id: ModalId) => void;
  closeModal: (id: ModalId) => void;
  closeAll: () => void;
  switchModal: (from: ModalId, to: ModalId) => void;
  isOpen: (id: ModalId) => boolean;
}

export function useModal(): UseModalReturn {
  const [activeModal, setActiveModal] = useState<ModalId | null>(null);

  const openModal = useCallback((id: ModalId) => {
    setActiveModal(id);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeModal = useCallback((_id: ModalId) => {
    setActiveModal(null);
    document.body.style.overflow = '';
  }, []);

  const closeAll = useCallback(() => {
    setActiveModal(null);
    document.body.style.overflow = '';
  }, []);

  const switchModal = useCallback((_from: ModalId, to: ModalId) => {
    setActiveModal(null);
    setTimeout(() => {
      setActiveModal(to);
    }, 180);
  }, []);

  const isOpen = useCallback(
    (id: ModalId) => activeModal === id,
    [activeModal]
  );

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeAll();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [closeAll]);

  return { activeModal, openModal, closeModal, closeAll, switchModal, isOpen };
}
