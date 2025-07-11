// QRScannerModal.jsx
import React, { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { Html5Qrcode } from 'html5-qrcode';

export const QRScannerModal = ({ open, onClose }) => {
    const scannerRef = useRef(null);
    const [isScanning, setIsScanning] = useState(false);

    // Fonction de nettoyage du scanner
    const stopScanner = async () => {
        if (scannerRef.current && isScanning) {
        try {
            await scannerRef.current.stop();
            await scannerRef.current.clear();
            setIsScanning(false);
        } catch (err) {
            console.warn("Le scanner était déjà arrêté.");
        }
        }
    };

    useEffect(() => {
        if (!open) return;

        const scanner = new Html5Qrcode('qr-reader');
        scannerRef.current = scanner;

        Html5Qrcode.getCameras().then((devices) => {
        if (devices && devices.length) {
            const cameraId = devices[0].id;
            scanner.start(
            cameraId,
            { fps: 10, qrbox: 250 },
            (decodedText) => {
                console.log(`✅ QR Code détecté : ${decodedText}`);
                stopScanner().then(onClose);
            },
            (errorMessage) => {
                // silence les erreurs de détection temporaires
            }
            );
            setIsScanning(true);
        }
        }).catch((err) => {
        console.error('Erreur caméra :', err);
        });

        return () => {
        stopScanner();
        };
    }, [open]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-[1000] bg-black/60 flex items-center justify-center">
        <div className="relative bg-white rounded-lg shadow-lg p-4 w-[90vw] max-w-md">
            {/* Bouton X de fermeture */}
            <button
            onClick={() => stopScanner().then(onClose)}
            className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
            >
            <X className="w-5 h-5" />
            </button>

            <h2 className="text-lg font-semibold mb-4 text-center">
            Scanner le QR Code de votre table
            </h2>
            <div id="qr-reader" className="rounded border" />
        </div>
        </div>
    );
};
