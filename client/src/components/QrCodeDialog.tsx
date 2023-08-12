import { useState } from 'react'
import { Dialog } from '@mui/material'
import { AiOutlineQrcode } from 'react-icons/ai'

export default function QrCodeDialog({qrCode}: {qrCode: Blob}) {
    
    const [open, setOpen] = useState(false)

    const handleClickOpen = () => {
        setOpen(true)
    }
    
      const handleClose = () => {
        setOpen(false)
    }

    return (
        <div>
            <div className="cursor-pointer" onClick={handleClickOpen}>
                <AiOutlineQrcode />
            </div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <div className="flex flex-col justify-center items-center">
                    <div className="pt-4 text-4xl font-extrabold">QR Code</div>
                    <img className="h-[300px] w-[300px]" src={URL.createObjectURL(qrCode)} alt="qrcode" />
                </div>
            </Dialog>
        </div>
    )
}