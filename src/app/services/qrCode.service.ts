'use service'
import qrCode from 'qrcode'

export const generateQRCode = (formData: FormData): Promise<string> => {
    const { text, hexadecimal } = Object.fromEntries(formData.entries())

    return new Promise((resolve, reject) => qrCode.toString(text.toString(), {
        errorCorrectionLevel: 'L',
        type: 'svg',
        color: {
          dark: hexadecimal.toString()
        },
        margin: 0,
        width: 300
      }, function(error, data) {
        if (error) reject(error)

        resolve(data)
    }))
}