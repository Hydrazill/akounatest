
import React from 'react';
import { QrCode } from 'lucide-react';

interface QRScannerProps {
  isVisible: boolean;
}

export const QRScanner = ({ isVisible }: QRScannerProps) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 backdrop-blur-sm p-4">
      <div className="bg-white p-6 sm:p-8 rounded-2xl text-center shadow-2xl border border-white/20 max-w-sm w-full">
        <div className="w-48 h-48 sm:w-64 sm:h-64 border-4 border-emerald-green rounded-2xl mb-4 flex items-center justify-center bg-gradient-to-br from-emerald-green/10 to-royal-gold/10 mx-auto">
          <div className="animate-pulse text-emerald-green">
            <QrCode className="h-16 w-16 sm:h-24 sm:w-24" />
          </div>
        </div>
        <p className="text-base sm:text-lg font-medium text-slate-blue">Scan en cours...</p>
        <div className="flex justify-center mt-4">
          <div className="w-6 h-6 sm:w-8 sm:h-8 border-2 border-emerald-green border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    </div>
  );
};
