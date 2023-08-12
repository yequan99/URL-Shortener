import { useState } from 'react'
import { Dialog } from '@mui/material'
import { AiOutlineQrcode } from 'react-icons/ai'
import { PiDownloadSimpleBold } from 'react-icons/pi'

export default function QrCodeDialog({qrCode, type}: {qrCode: Blob, type: String}) {
    
    const [open, setOpen] = useState(false)

    const handleClickOpen = () => {
        setOpen(true)
    }
    
      const handleClose = () => {
        setOpen(false)
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
                <div className="flex flex-col justify-center items-center pb-4">
                    <div className="pt-4 text-4xl font-extrabold">QR Code</div>
                    <img className="h-[300px] w-[300px]" src={URL.createObjectURL(qrCode)} alt="qrcode" />
                    <div className="flex flex-row mb-2 p-2 items-center justify-center bg-teal rounded-md text-white cursor-pointer">
                        <h1 className="pr-2">Download PNG</h1>
                        <PiDownloadSimpleBold />
                    </div>
                </div>
            </Dialog>
        </div>
    )
}