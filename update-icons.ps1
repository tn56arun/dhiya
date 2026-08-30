# Arun & Dhiya - Icon Generator Script
Add-Type -AssemblyName System.Drawing

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$src = Join-Path $scriptDir "icons\icon.png"
$iconsDir = Join-Path $scriptDir "icons"

if (-not (Test-Path $src)) {
    Write-Host "[ERROR] 'icons\icon.png' not found! Please place your new image as 'icons\icon.png'." -ForegroundColor Red
    Pause
    exit
}

$img = [System.Drawing.Image]::FromFile($src)
Write-Host "[INFO] Processing image: $($img.Width)x$($img.Height)" -ForegroundColor Cyan

$sizes = @(
    @{ Name = "icon-16.png"; Size = 16 },
    @{ Name = "icon-32.png"; Size = 32 },
    @{ Name = "icon-180.png"; Size = 180 },
    @{ Name = "icon-192.png"; Size = 192 },
    @{ Name = "icon-512.png"; Size = 512 },
    @{ Name = "favicon.png"; Size = 64 }
)

foreach ($item in $sizes) {
    $s = $item.Size
    $targetPath = Join-Path $iconsDir $item.Name

    $bmp = New-Object System.Drawing.Bitmap $s, $s, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $g = [System.Drawing.Graphics]::FromImage($bmp)

    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
    $g.Clear([System.Drawing.Color]::Transparent)

    $path = New-Object System.Drawing.Drawing2D.GraphicsPath
    $path.AddEllipse(0, 0, ($s - 1), ($s - 1))
    
    $g.SetClip($path)
    $g.DrawImage($img, 0, 0, $s, $s)
    $g.ResetClip()

    if ($s -ge 64) {
        $pen = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(180, 255, 255, 255)), (1.5 * ($s / 192.0))
        $g.DrawEllipse($pen, 0.5, 0.5, ($s - 1.5), ($s - 1.5))
        $pen.Dispose()
    }

    $bmp.Save($targetPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $path.Dispose()
    $g.Dispose()
    $bmp.Dispose()

    Write-Host "[SUCCESS] Created: $($item.Name) ($($s)x$($s))" -ForegroundColor Green
}

$img.Dispose()
Write-Host ""
Write-Host "[DONE] All round icons and favicons updated successfully!" -ForegroundColor Green
