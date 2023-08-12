import { useState } from 'react'
import { Dialog } from '@mui/material'
import { AiOutlineQrcode } from 'react-icons/ai'
import { PiDownloadSimpleBold } from 'react-icons/pi'
import { RxCross2 } from 'react-icons/rx'

export default function QrCodeDialog({qrCode, type}: {qrCode: Blob, type: string}) {
    
    const [open, setOpen] = useState(false)
    const qrCodeUrl: string = qrCode ? URL.createObjectURL(qrCode) : ""

    const handleClickOpen = () => {
        if (qrCode.size !== 0) {
            setOpen(true)
        }
    }
    
    const handleClose = () => {
        setOpen(false)
    }

    const DownloadBlobAsPNG = (blobUrl: string, fileName: string) => {
        const a = document.createElement("a")
        a.href = blobUrl
        a.download = fileName
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(blobUrl)
    }

    return (
        <div>
            {
                type === "Saved" 
                &&             
                <div className="cursor-pointer" onClick={handleClickOpen}>
                    <AiOutlineQrcode />
                </div>
            }
            {
                type === "Generated" 
                &&   
                <h1 className="text-white" onClick={handleClickOpen}>QR Code</h1>
            }
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <div className="flex justify-end pt-2 pr-2 cursor-pointer" onClick={handleClose}>
                    <RxCross2 />
                </div>
                <div className="flex flex-col justify-center items-center pb-4">
                    <div className="pt-4 text-4xl font-extrabold">QR Code</div>
                    <img className="h-[300px] w-[300px]" src={qrCodeUrl} alt="qrcode" />
                    <div className="flex flex-row mb-2 p-2 items-center justify-center bg-teal rounded-md text-white cursor-pointer" onClick={() => DownloadBlobAsPNG(qrCodeUrl, 'qrCode.png')}>
                        <h1 className="pr-2">Download PNG</h1>
                        <PiDownloadSimpleBold />
                    </div>
                </div>
            </Dialog>
        </div>
    )
}