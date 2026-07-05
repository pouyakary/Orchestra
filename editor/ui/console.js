// ─── Update console title ────────────────────────────────────────────────────

function updateConsoleTitle() {
    const title = getFileName()
    const dirtStatus = getFileDirtStatus() ? ' &bullet; Not Saved' : ''
    document.title = title
    setConsoleTitle(`${title}${dirtStatus}`)
    window.electronAPI.setRepresentedFilename(title)
}

function setConsoleTitle(title) {
    document.getElementById('ribbon-console-title').innerHTML = title
}

// ─── Log object ──────────────────────────────────────────────────────────────

class Log {
    constructor(message) {
        ;(currentDisplayLog
            ? currentDisplayLog.terminate()
            : Promise.resolve()
        ).then(() => {
            this.display(message)
            currentDisplayLog = this
        })
    }

    terminate() {
        return new Promise((resolve) => {
            let index = document.getElementById(logConsoleId).innerText.length - 1
            this.terminateInterval = setInterval(() => {
                if (index > 1) {
                    document.getElementById(logConsoleId).innerText =
                        document.getElementById(logConsoleId).innerText.substring(0, index--)
                } else {
                    document.getElementById(logConsoleId).innerHTML = emptyLogConsoleValue
                    clearInterval(this.terminateInterval)
                    clearInterval(this.writerInterval)
                    clearTimeout(this.timeout)
                    clearTimeout(this.writeTimeout)
                    resolve()
                }
            }, 30)
        })
    }

    display(message) {
        const delay = this.writeToConsole(message)
        this.writeTimeout = setTimeout(() => {
            this.timeout = setTimeout(this.terminate, message.split(' ').length * 400 + 2000)
        }, delay)
    }

    writeToConsole(message) {
        document.getElementById(logConsoleId).innerHTML = ''
        let index = 0
        const delay = 30

        this.writerInterval = setInterval(() => {
            if (index < message.length)
                document.getElementById(logConsoleId).innerHTML += message[index++]
            else
                clearInterval(this.writerInterval)
        }, delay)

        return delay * message.length
    }
}
