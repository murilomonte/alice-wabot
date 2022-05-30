/*
Olá, jovem dev
Esse bot usa como base o bot do MhankBarBar.
considere ver o comando /about
*/
const {
    WAConnection,
    MessageType,
    Presence,
    Mimetype,
    MessageOptions,
    GroupSettingChange
} = require('@adiwajshing/baileys')
const Jimp = require('jimp')
const { rastro } = require('rastrojs')
const speed = require('performance-now')
const brainly = require('brainly-scraper')
const request = require('request')
const os = require('os')
const {
    color,
    bgcolor
} = require('./lib/color')
const {
    help,
    rank,
    about,
    random
} = require('./src/help')
const {
    wait,
    sleep,
    simih,
    getBuffer,
    h2k,
    generateMessageID,
    getGroupAdmins,
    getRandom,
    banner,
    start,
    info,
    success,
    close
} = require('./lib/functions')
const {
    fetchJson,
    fetchText
} = require('./lib/fetcher')
const {
    recognize
} = require('./lib/ocr')
const fs = require('fs')
const moment = require('moment-timezone')
const {
    exec
} = require('child_process')
const fetch = require('node-fetch')
const tiktod = require('tiktok-scraper')
const ffmpeg = require('fluent-ffmpeg')
const {
    removeBackgroundFromImageFile
} = require('remove.bg')
const axios = require('axios')
const sinesp = require('sinesp-api')
const lolis = require('lolis.life')
const crypto = require('crypto')
const loli = new lolis()
const setiker = JSON.parse(fs.readFileSync('./lib/database/stik.json'))
const videonye = JSON.parse(fs.readFileSync('./lib/database/video.json'))
const audionye = JSON.parse(fs.readFileSync('./lib/database/audio.json'))
const imagenye = JSON.parse(fs.readFileSync('./lib/database/image.json'))
const welkom = JSON.parse(fs.readFileSync('./src/welkom.json'))
const nsfw = JSON.parse(fs.readFileSync('./src/nsfw.json'))
const samih = JSON.parse(fs.readFileSync('./src/simi.json'))
const setting = JSON.parse(fs.readFileSync('./src/settings.json'))
const user = JSON.parse(fs.readFileSync('./database/json/user.json'))
const _leveling = JSON.parse(fs.readFileSync('./database/json/leveling.json'))
const _level = JSON.parse(fs.readFileSync('./database/json/level.json'))
userlimit = setting.user_limit
const total_users = user.length
prefix = setting.prefix
blocked = []


//level
const getLevelingXp = (userId) => {
    let position = false
    Object.keys(_level).forEach((i) => {
        if (_level[i].jid === userId) {
            position = i
        }
    })
    if (position !== false) {
        return _level[position].xp
    }
}

const getLevelingLevel = (userId) => {
    let position = false
    Object.keys(_level).forEach((i) => {
        if (_level[i].jid === userId) {
            position = i
        }
    })
    if (position !== false) {
        return _level[position].level
    }
}

const getLevelingId = (userId) => {
    let position = false
    Object.keys(_level).forEach((i) => {
        if (_level[i].jid === userId) {
            position = i
        }
    })
    if (position !== false) {
        return _level[position].jid
    }
}

const addLevelingXp = (userId, amount) => {
    let position = false
    Object.keys(_level).forEach((i) => {
        if (_level[i].jid === userId) {
            position = i
        }
    })
    if (position !== false) {
        _level[position].xp += amount
        fs.writeFileSync('./database/json/level.json', JSON.stringify(_level))
    }
}

const addLevelingLevel = (userId, amount) => {
    let position = false
    Object.keys(_level).forEach((i) => {
        if (_level[i].jid === userId) {
            position = i
        }
    })
    if (position !== false) {
        _level[position].level += amount
        fs.writeFileSync('./database/json/level.json', JSON.stringify(_level))
    }
}

const addLevelingId = (userId) => {
    const obj = {
        jid: userId,
        xp: 1,
        level: 1
    }
    _level.push(obj)
    fs.writeFileSync('./database/json/level.json', JSON.stringify(_level))
}
//level
const createSerial = (size) => {
    return crypto.randomBytes(size).toString('hex').slice(0, size)
}
function kyun(seconds) {
    function pad(s) {
        return (s < 10 ? '0' : '') + s;
    }
    var hours = Math.floor(seconds / (60 * 60));
    var minutes = Math.floor(seconds % (60 * 60) / 60);
    var seconds = Math.floor(seconds % 60);

    //return pad(hours) + ':' + pad(minutes) + ':' + pad(seconds)
    return `${pad(hours)} Horas, ${pad(minutes)} Minutos e ${pad(seconds)} Segundos`
}

async function starts() {
    const client = new WAConnection()
    client.logger.level = 'warn'
    console.log(banner.string)
    client.on('qr', () => {
        console.log(color('[', 'white'), color('!', 'red'), color(']', 'white'), color(' Scan the qr code above'))
    })

    fs.existsSync('./BarBar.json') && client.loadAuthInfo('./BarBar.json')
    client.on('connecting', () => {
        start('2', 'Connecting...')
    })
    client.on('open', () => {
        success('2', 'Connected')
    })
    await client.connect({
        timeoutMs: 30 * 1000
    })
    fs.writeFileSync('./BarBar.json', JSON.stringify(client.base64EncodedAuthInfo(), null, '\t'))

    client.on('group-participants-update', async (anu) => {
        if (!welkom.includes(anu.jid)) return
        try {
            const mdata = await client.groupMetadata(anu.jid)
            console.log(anu)
            if (anu.action == 'add') {
                num = anu.participants[0]
                try {
                    ppimg = await client.getProfilePicture(`${anu.participants[0].split('@')[0]}@c.us`)
                } catch {
                    ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
                }
                teks = `Olá @${num.split('@')[0]} :)\n Seja bem vindo ao grupo! *${mdata.subject}*`
                let buff = await getBuffer(ppimg)
                client.sendMessage(mdata.id, buff, MessageType.image, {
                    caption: teks,
                    contextInfo: {
                        "mentionedJid": [num]
                    }
                })
            } else if (anu.action == 'remove') {
                num = anu.participants[0]
                try {
                    ppimg = await client.getProfilePicture(`${num.split('@')[0]}@c.us`)
                } catch {
                    ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
                }
                teks = `Até mais @${num.split('@')[0]}👋`
                let buff = await getBuffer(ppimg)
                client.sendMessage(mdata.id, buff, MessageType.image, {
                    caption: teks,
                    contextInfo: {
                        "mentionedJid": [num]
                    }
                })
            }
        } catch (e) {
            console.log('Error : %s', color(e, 'red'))
        }
    })

    client.on('CB:Blocklist', json => {
        if (blocked.length > 2) return
        for (let i of json[1].blocklist) {
            blocked.push(i.replace('c.us', 's.whatsapp.net'))
        }
    })

    client.on('chat-update', async (mek) => {
        try {
            if (!mek.hasNewMessage) return
            mek = mek.messages.all()[0]
            if (!mek.message) return
            if (mek.key && mek.key.remoteJid == 'status@broadcast') return
            if (mek.key.fromMe) return
            global.prefix
            global.blocked
            const content = JSON.stringify(mek.message)
            const from = mek.key.remoteJid
            const type = Object.keys(mek.message)[0]
            const apiKey = setting.apiKey // contact me on whatsapp wa.me/6285892766102
            const lolapi = setting.lolapi2
            const {
                text,
                extendedText,
                contact,
                location,
                liveLocation,
                image,
                video,
                sticker,
                document,
                audio,
                product
            } = MessageType
            const time = moment.tz('America/Bahia').format('MM/DD/YYYY HH:mm:ss')
            body = (type === 'conversation' && mek.message.conversation.startsWith(prefix)) ? mek.message.conversation : (type == 'imageMessage') && mek.message.imageMessage.caption.startsWith(prefix) ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption.startsWith(prefix) ? mek.message.videoMessage.caption : (type == 'extendedTextMessage') && mek.message.extendedTextMessage.text.startsWith(prefix) ? mek.message.extendedTextMessage.text : ''
            budy = (type === 'conversation') ? mek.message.conversation : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : ''
            const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
            const args = body.trim().split(/ +/).slice(1)
            const isCmd = body.startsWith(prefix)

            const botNumber = client.user.jid
            const ownerNumber = [`${setting.ownerNumber}@s.whatsapp.net`] // replace this with your number
            const isGroup = from.endsWith('@g.us')
            const sender = isGroup ? mek.participant : mek.key.remoteJid
            const groupMetadata = isGroup ? await client.groupMetadata(from) : ''
            const groupName = isGroup ? groupMetadata.subject : ''
            const groupId = isGroup ? groupMetadata.jid : ''
            const groupMembers = isGroup ? groupMetadata.participants : ''
            const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
            const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
            const isGroupAdmins = groupAdmins.includes(sender) || false
            const isWelkom = isGroup ? welkom.includes(from) : false
            const isNsfw = isGroup ? nsfw.includes(from) : false
            const isSimi = isGroup ? samih.includes(from) : false
            const isOwner = ownerNumber.includes(sender)
            const isLevelingOn = isGroup ? _leveling.includes(from) : false
            pushname = client.contacts[sender] != undefined ? client.contacts[sender].vname || client.contacts[sender].notify : undefined
            const isUser = user.includes(sender)
            //const isLevelingOn = isGroup ? _leveling.includes(groupId) : false
            pushname = client.contacts[sender] != undefined ? client.contacts[sender].vname || client.contacts[sender].notify : undefined
            const date = new Date().toLocaleDateString()
            const mp3 = { quoted: mek, mimetype: 'audio/mp4', ptt: true }

            mess = {
                wait: 'Processando...',
                success: 'Sucesso!',
                levelon: '[✔️]Sistema de níveis habilitados',
                leveloff: '[✔️]Sistema de níveis desabilitado',
                levelnoton: '[‼️]Desculpe, níveis não disponíveis',
                levelnol: '*Seu nível ainda é 0',
                error: {
                    stick: 'Ocorreu um erro. Tente novamente.',
                    Iv: 'link inválido'
                },
                only: {
                    group: 'Este comando só pode ser usado em grupos!',
                    ownerG: 'Esse comando só pode ser usado pelo dono do grupo!',
                    ownerB: 'Esse comando só pode ser usado pelo carinha que cuida de mim',
                    admin: 'Esse comando só pode ser usado pelos Ademiros do grupo!',
                    Badmin: 'Esse comando só pode ser usado se eu for uma Ademira',
                    userB: `Olá ${pushname} :)\nHmm, não consigo encontrar você no meu banco de dados... Bem, se quiser usar meus comandos terá que se registrar!\nEnvie ${prefix}registrar para se registrar`,
                    /*group: '❌ Perintah ini hanya bisa di gunakan dalam group! ❌',
                    ownerG: '❌ Perintah ini hanya bisa di gunakan oleh owner group! ❌',
                    ownerB: '❌ Perintah ini hanya bisa di gunakan oleh owner bot! ❌',
                    admin: '❌ Perintah ini hanya bisa di gunakan oleh admin group! ❌',
                    Badmin: '❌ Perintah ini hanya bisa di gunakan ketika bot menjadi admin! ❌'
                    */
                }
            }

            const isUrl = (url) => {
                return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
            }
            const reply = (teks) => {
                client.sendMessage(from, teks, text, {
                    quoted: mek
                })
            }
            const sendMess = (hehe, teks) => {
                client.sendMessage(hehe, teks, text)
            }
            const mentions = (teks, memberr, id) => {
                (id == null || id == undefined || id == false) ? client.sendMessage(from, teks.trim(), extendedText, {
                    contextInfo: {
                        "mentionedJid": memberr
                    }
                }) : client.sendMessage(from, teks.trim(), extendedText, {
                    quoted: mek,
                    contextInfo: {
                        "mentionedJid": memberr
                    }
                })
            }

            //function rank 
            const levelRole = getLevelingLevel(sender, _level)
            var role = 'Estagiário'
            if (levelRole <= 5) {
                role = 'Júnior'
            } else if (levelRole <= 6) {
                role = 'bronze I'
            } else if (levelRole <= 7) {
                role = 'Bronze II'
            } else if (levelRole <= 8) {
                role = 'Bronze III'
            } else if (levelRole <= 9) {
                role = 'Prata I'
            } else if (levelRole <= 10) {
                role = 'Prata II'
            } else if (levelRole <= 11) {
                role = 'Prata III'
            } else if (levelRole <= 12) {
                role = 'Ouro I'
            } else if (levelRole <= 13) {
                role = 'Ouro II'
            } else if (levelRole <= 14) {
                role = 'Ouro III'
            } else if (levelRole <= 15) {
                role = 'Diamante I'
            } else if (levelRole <= 16) {
                role = 'Diamante II'
            } else if (levelRole <= 17) {
                role = 'Diamante III'
            } else if (levelRole <= 18) {
                role = 'Diamante IV'
            } else if (levelRole <= 19) {
                role = 'Diamante V'
            } else if (levelRole <= 20) {
                role = 'Diamante Mestre'
            } else if (levelRole <= 21) {
                role = 'Elite'
            } else if (levelRole <= 22) {
                role = 'Lendário'
            } else if (levelRole <= 23) {
                role = 'Semi-Deus'
            } else if (levelRole <= 24) {
                role = 'Deus'
            } else if (levelRole <= 25) {
                role = 'Quase dono do bot'
            } else if (levelRole <= 35) {
                role = 'Não vai ser dono 👍'
            } else if (levelRole <= 50) {
                role = 'patente alta demais, não tem nome'
            }

            //function leveling
            if (isGroup && isLevelingOn) {
                const currentLevel = getLevelingLevel(sender)
                const checkId = getLevelingId(sender)
                try {
                    if (currentLevel === undefined && checkId === undefined) addLevelingId(sender)
                    const amountXp = Math.floor(Math.random() * 10) + 500
                    const requiredXp = 5000 * (Math.pow(2, currentLevel) - 1)
                    const getLevel = getLevelingLevel(sender)
                    addLevelingXp(sender, amountXp)
                    if (requiredXp <= getLevelingXp(sender, 2)) {
                        addLevelingLevel(sender, 1)
                        await reply(`*「 NIVEL UP! 」*\n\n❑ Nome: ${pushname}\n❑ Patente: ${role}\n❑ XP: ${getLevelingXp(sender)}\n❑ Nivel: ${getLevel} -> ${getLevelingLevel(sender)}\n\nParabens!!`)
                    }
                } catch (err) {
                    console.error(err)
                }
            }

            colors = ['red', 'white', 'black', 'blue', 'yellow', 'green']
            const isMedia = (type === 'imageMessage' || type === 'videoMessage')
            const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
            const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
            const isQuotedAudio = type === 'extendedTextMessage' && content.includes('audioMessage')
            const isQuoted = type === 'extendedTextMessage' && content.includes('message')
            const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')
            const userLevel = getLevelingLevel(sender)
            const userXp = getLevelingXp(sender)
            const timestamp = speed();
            const latensi = speed() - timestamp
            //client.updatePresence(from, Presence.composing)
            uptime = process.uptime()

            if (!isGroup && isCmd) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mExecutando\x1b[1;37m]', time, color(command), 'por', color(sender.split('@')[0]), 'argumentos :', color(args.length))
            if (!isGroup && !isCmd) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;31mRecebido\x1b[1;37m]', time, color('Message'), 'por', color(sender.split('@')[0]), 'argumentos :', color(args.length))
            if (isCmd && isGroup) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mExecutando\x1b[1;37m]', time, color(command), 'por', color(sender.split('@')[0]), 'em', color(groupName), 'argumentos :', color(args.length))
            if (!isCmd && isGroup) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;31mRecebido\x1b[1;37m]', time, color('Message'), 'por', color(sender.split('@')[0]), 'em', color(groupName), 'argumentos :', color(args.length))
            let authorname = client.contacts[from] != undefined ? client.contacts[from].vname || client.contacts[from].notify : undefined
            if (authorname != undefined) { } else {
                authorname = groupName
            }

            function addMetadata(packname, author) {
                if (!packname) packname = 'WABot';
                if (!author) author = 'Bot';
                author = author.replace(/[^a-zA-Z0-9]/g, '');
                let name = `${author}_${packname}`
                if (fs.existsSync(`./src/stickers/${name}.exif`)) return `./src/stickers/${name}.exif`
                const json = {
                    "sticker-pack-name": packname,
                    "sticker-pack-publisher": author,
                }
                const littleEndian = Buffer.from([0x49, 0x49, 0x2A, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57, 0x07, 0x00])
                const bytes = [0x00, 0x00, 0x16, 0x00, 0x00, 0x00]

                let len = JSON.stringify(json).length
                let last

                if (len > 256) {
                    len = len - 256
                    bytes.unshift(0x01)
                } else {
                    bytes.unshift(0x00)
                }

                if (len < 16) {
                    last = len.toString(16)
                    last = "0" + len
                } else {
                    last = len.toString(16)
                }

                const buf2 = Buffer.from(last, "hex")
                const buf3 = Buffer.from(bytes)
                const buf4 = Buffer.from(JSON.stringify(json))

                const buffer = Buffer.concat([littleEndian, buf2, buf3, buf4])

                fs.writeFile(`./src/stickers/${name}.exif`, buffer, (err) => {
                    return `./src/stickers/${name}.exif`
                })

            }

            switch (command) {

                ///////////////////////////////////////////////////////////////////////////////////////////////////////
                ///////////////////////////////////////////////////////////////////////////////////////////////////////
                case 'roundsticker':
                    if ((isMedia && !client.message.videoMessage || isQuotedImage) && args.length == 0) {
                        const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
                        filePath = await client.downloadAndSaveMediaMessage(encmedia)
                        file_name = getRandom('.webp')
                        request({
                            url: `https://api.lolhuman.xyz/api/convert/towebpwround?apikey=${lolapi}`,
                            method: 'POST',
                            formData: {
                                "img": fs.createReadStream(filePath)
                            },
                            encoding: "binary"
                        }, function (error, response, body) {
                            fs.unlinkSync(filePath)
                            fs.writeFileSync(file_name, body, "binary")
                            ini_buff = fs.readFileSync(file_name)
                            client.sendMessage(from, ini_buff, sticker, { quoted: mek }).then(() => {
                                fs.unlinkSync(file_name)
                            })
                        });
                    } else {
                        reply(`Kirim gambar dengan caption ${prefix}sticker atau tag gambar yang sudah dikirim`)
                    }
                    break

                case 'getmusic':
                    let musicDir = args.join(" ")
                    let musica = fs.readFileSync(`storage/emulated/0/${musicDir}.mp3`)
                    client.sendMessage(from, música, audio, mp3)
                    break
                case 'getsticker':
                case 'gets':
                    //if (!isRegistered) return reply(ind.noregis())
                    namastc = body.slice(12)
                    let resultstik = fs.readFileSync(`./lib/database/sticker/${namastc}.webp`)
                    client.sendMessage(from, resultstik, sticker, { quoted: mek })
                    break
                case 'stickerlist':
                case 'liststicker':
                    //if (!isRegistered) return reply(ind.noregis())
                    teks = '*Banco de stickers :*\nUse /getsticker para vê-lo\n\n'
                    for (let awokwkwk of setiker) {
                        teks += `- ${awokwkwk}\n`
                    }
                    teks += `\n*Total : ${setiker.length}*`
                    client.sendMessage(from, teks.trim(), extendedText, { quoted: mek, contextInfo: { "mentionedJid": setiker } })
                    break
                case 'addsticker':
                    //	if (!isRegistered) return reply(ind.noregis())
                    if (!isQuotedSticker) return reply('Responda um sticker com esse comando :)')
                    svst = body.slice(12)
                    if (!svst) return reply('Defina um nome para o sticker após o comando')
                    boij = JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
                    delb = await client.downloadMediaMessage(boij)
                    setiker.push(`${svst}`)
                    fs.writeFileSync(`./lib/database/sticker/${svst}.webp`, delb)
                    fs.writeFileSync(`./lib/database/stik.json`, JSON.stringify(setiker))
                    client.sendMessage(from, `Sucesso!\nEnvie ${prefix}liststicker para ver a lista completa`, MessageType.text, { quoted: mek })
                    break
                case 'addvn':

                    //	if (!isRegistered) return reply(ind.noregis())
                    if (!isQuotedAudio) return reply('Responda um áudio com esse comando :)')
                    svst = body.slice(7)
                    if (!svst) return reply('Envie um título após o comando')
                    boij = JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
                    delb = await client.downloadMediaMessage(boij)
                    audionye.push(`${svst}`)
                    fs.writeFileSync(`./lib/database/audio/${svst}.mp3`, delb)
                    fs.writeFileSync('./lib/database/audio.json', JSON.stringify(audionye))
                    client.sendMessage(from, `Sucesso!\nEnvie ${prefix}listaudio para ver a lista completa`, MessageType.text, { quoted: mek })
                    break
                case 'getvn':

                    //	if (!isRegistered) return reply(ind.noregis())
                    namastc = body.slice(7)
                    buffer = fs.readFileSync(`./lib/database/audio/${namastc}.mp3`)
                    client.sendMessage(from, buffer, audio, { mimetype: 'audio/mp4', quoted: mek, ptt: true })
                    break
                case 'listvn':
                case 'vnlist':
                case 'audiolist':
                case 'listaudio':
                    //	if (!isRegistered) return reply(ind.noregis())
                    teks = '*Banco de áudios:*\nUse /getaudio para ouvi-lo\n\n'
                    for (let awokwkwk of audionye) {
                        teks += `- ${awokwkwk}\n`
                    }
                    teks += `\n*Total : ${audionye.length}*`
                    client.sendMessage(from, teks.trim(), extendedText, { quoted: mek, contextInfo: { "mentionedJid": audionye } })
                    break
                case 'addimage':
                    //	if (!isRegistered) return reply(ind.noregis())
                    if (!isQuotedImage) return reply('Responda uma imagem com esse comando :)')
                    svst = body.slice(10)
                    if (!svst) return reply('Envie um título depois do comando')
                    boij = JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
                    delb = await client.downloadMediaMessage(boij)
                    imagenye.push(`${svst}`)
                    fs.writeFileSync(`./lib/database/image/${svst}.jpeg`, delb)
                    fs.writeFileSync('./lib/database/image.json', JSON.stringify(imagenye))
                    client.sendMessage(from, `Sucesso!\nEnvie ${prefix}listimage para ver a lista completa`, MessageType.text, { quoted: mek })
                    break
                case 'getimage':
                    //	if (!isRegistered) return reply(ind.noregis())
                    namastc = body.slice(10)
                    buffer = fs.readFileSync(`./lib/database/image/${namastc}.jpeg`)
                    client.sendMessage(from, buffer, image, { quoted: mek, caption: `Resultado da base de dados : ${namastc}.jpeg` })
                    break
                case 'imagelist':
                case 'listimage':
                    //		if (!isRegistered) return reply(ind.noregis())
                    teks = '*Banco de imagens :*\nUse /getimage seguido do nome da imagem para vê-la :)\n\n'
                    for (let awokwkwk of imagenye) {
                        teks += `- ${awokwkwk}\n`
                    }
                    teks += `\n*Total : ${imagenye.length}*`
                    client.sendMessage(from, teks.trim(), extendedText, { quoted: mek, contextInfo: { "mentionedJid": imagenye } })
                    break
                case 'addvideo':
                    //		if (!isRegistered) return reply(ind.noregis())
                    if (!isQuotedVideo) return reply('Responda um vídeo com esse comando :)')
                    svst = body.slice(10)
                    if (!svst) return reply('Envie um título pra ele logo em seguida do comando.')
                    boij = JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
                    delb = await client.downloadMediaMessage(boij)
                    videonye.push(`${svst}`)
                    fs.writeFileSync(`./lib/database/video/${svst}.mp4`, delb)
                    fs.writeFileSync('./lib/database/video.json', JSON.stringify(videonye))
                    client.sendMessage(from, `Sucesso!\nEnvie ${prefix}listvideo para ver a lista completa`, MessageType.text, { quoted: mek })
                    break
                case 'getvideo':
                    //	if (!isRegistered) return reply(ind.noregis())
                    namastc = body.slice(10)
                    buffer = fs.readFileSync(`./lib/database/video/${namastc}.mp4`)
                    client.sendMessage(from, buffer, video, { mimetype: 'video/mp4', quoted: mek })
                    break
                case 'listvideo':
                case 'videolist':
                    //if (!isRegistered) return reply(ind.noregis())
                    teks = '*Banco de vídeos :*\nUse /getvideos seguido do título para vê-lo.\n\n'
                    for (let awokwkwk of videonye) {
                        teks += `- ${awokwkwk}\n`
                    }
                    teks += `\n*Total : ${videonye.length}*`
                    client.sendMessage(from, teks.trim(), extendedText, { quoted: mek, contextInfo: { "mentionedJid": videonye } })
                    break


                case 'softban':
                    if (isGroup && isGroupAdmins || isGroup && isOwner) {
                        if (!isGroupAdmins) return client.reply(from, mess.error, text)
                        if (args.length == 0) return reply(`Mencione e informe o tempo que o meliante ficará banido, caro adm :)\nEx: ${prefix}softban @MilfHunter 20`)
                        const tempoban = args[1] * 60000
                        const bgmcomum = mek.message.extendedTextMessage.contextInfo.mentionedJid
                        console.log(bgmcomum)
                        reply(`Ihhhh, parece que vc irritou algum ADM, daqui a ${args[1]}minutos eu te coloco de volta!`)
                        client.groupRemove(from, bgmcomum)
                        setTimeout(() => {
                            reply('Está na hora de colocar o nosso querido ~corno~ membro.')
                            client.groupAdd(from, bgmcomum)
                            reply(`Espero que você tenha repensado suas ações e se acalmado. :)`)
                        }, tempoban) //20 minutos em milissegundos
                        sleep(tempoban)
                    } else if (!isGroup) {
                        reply(mess.only.group)
                    } else {
                        reply(`ocorreu um erro, tentw novamente`)
                    }
                    break
                case 'igdl':
                    let iglink = args[0]
                    let resultaado = await fetchJson(`https://videfikri.com/api/igdl/?url=${iglink}`)
                    let vidiu = await getBuffer(resultaado.result.video)
                    client.sendMessage(from, vidiu, video)
                    break
                case 'info_server':
                    let modelo = `» ｢ 𝐒𝐞𝐫𝐯𝐞𝐫 𝐈𝐧𝐟𝐨 ｣
 *Hostname* : _${os.hostname()}_
 *Platfrom* : _${os.platform()}_
 *CPU* : _${os.cpus()[0].model}_ 
 *Speed* : _${os.cpus()[0].speed}MHz_
 *RAM usage* : _${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require(`os`).totalmem / 1024 / 1024)}MB_
 `
                    reply(modelo)

                    break
                case 'alicinha':
                    let query = body.slice(7)
                    let alice = await fetchJson(`https://videfikri.com/api/simsimi/?teks=${query}`)
                    console.log(alice.result)
                    let resposta = alice.result.jawaban
                    client.sendMessage(from, resposta, text, { quoted: mek })
                    break

                case 'ninja':

                    let nome = args[0]
                    let sub = args[1]
                    //let nub = await fetchJson(`http://lolhuman.herokuapp.com/api/textprome2/ninjalogo?apikey=${lolapi}&text1=${nome}&text2=${sub}`, {method: 'get'})
                    buffer = await getBuffer(`http://lolhuman.herokuapp.com/api/textprome2/ninjalogo?apikey=${lolapi}&text1=${nome}&text2=${sub}`)
                    client.sendMessage(from, buffer, image)
                    //client.sendMessage(from, buffer, image)
                    //await limitAdd(sender)
                    break
                case 'escreva3':

                    // if (!isRegistered) return reply( ind.noregis())
                    //if (isLimit(sender)) return reply(ind.limitend(pusname))
                    //if (isBanned) return reply('Maaf kamu sudah terbenned!')
                    if (args.length < 1) return reply(ind.wrongf())
                    ct = body.slice(7)
                    reply(mess.wait)
                    anu = await fetchJson(`https://videfikri.com/api/nulis/?query=${ct}`, { method: 'get' })
                    gools5 = await getBuffer(anu.image)
                    client.sendMessage(from, gools5, image, { caption: 'Nih kak udah jadi..', quoted: mek })
                    //await limitAdd(sender)
                    break
                case 'escreva2':

                    // if (!isRegistered) return reply( ind.noregis())
                    //if (isLimit(sender)) return reply(ind.limitend(pusname))
                    //if (isBanned) return reply('Maaf kamu sudah terbenned!')
                    if (args.length < 1) return reply(ind.wrongf())
                    ct = body.slice(7)
                    ll1 = ct.split("/")[0];
                    ll2 = ct.split("/")[1];
                    ll3 = ct.split("/")[2];
                    ll4 = ct.split("/")[3];
                    reply(mess.wait)
                    ct = await getBuffer(`https://api.zeks.xyz/api/magernulis?nama=${ll1}&kelas=${ll2}&text=${ll3}&tinta=${ll4}`)
                    client.sendMessage(from, ct, image, { caption: 'Nih kak udah jadi..', quoted: mek })
                    //await limitAdd(sender)
                    break
                case 'escreva4':

                    //if (!isRegistered) return reply( ind.noregis())
                    //if (isLimit(sender)) return reply(ind.limitend(pusname))
                    //if (isBanned) return reply('Maaf kamu sudah terbenned!')
                    if (args.length < 1) return reply(ind.wrongf())
                    ct = body.slice(7)
                    reply(mess.wait)
                    ct = await getBuffer(`https://api.vhtear.com/write?text=${ct}&apikey=c1d162b46e634f389efa1ac715f03d03`)
                    client.sendMessage(from, ct, image, { caption: 'Nih kak udah jadi..', quoted: mek })
                    //await limitAdd(sender)
                    break
                case 'phcomment':

                    var gh = body.slice(11)
                    var yogi = gh.split("/")[0];
                    var cmnt = gh.split("/")[1];
                    if (args.length < 1) return reply(`Exemplo: ${prefix}phcomment Yogi/yahahaha`)
                    reply(mess.wait)
                    yogi = await getBuffer(`https://api.zeks.xyz/api/phub?apikey=apivinz&img=https://1.bp.blogspot.com/-x8KhcOBG-yw/XiU4pi1yWVI/AAAAAAAADBA/gK8tsLyc1lQ808A348IKzDCjf6fUBKONwCLcBGAsYHQ/s1600/cara%2Bbuat%2Bfoto%2Bprofil%2Bdi%2Bwhatsapp%2Bmenjadi%2Bunik.jpg&username=${yogi}&msg=${cmnt}`)
                    client.sendMessage(from, yogi, image, { quoted: mek })
                    //await limitAdd(sender)
                    break
                case 'escreva':
                    if (!isUser) return reply(mess.only.userB)
                    //if (isLimit(sender)) return reply(ind.limitend(pusname))
                    //if (isBanned) return reply('Desculpe, você foi banido!')
                    if (args.length < 1) return reply(ind.wrongf())
                    ct = body.slice(8)
                    reply(mess.wait)
                    ct = await getBuffer(`https://api.zeks.xyz/api/nulis?text=${ct}&apikey=apivinz`)
                    client.sendMessage(from, ct, image, { caption: 'Escrevi pra você, jovem', quoted: mek })
                    //await limitAdd(sender)
                    break
                case 'f':
                    client.sendMessage(from, 'Press F to pay respect', text)
                    client.sendMessage(from, 'F', text)
                    break
                case 'buscar':
                    if (args.length == 0) return reply(`Example: ${prefix + command} loli kawaii`)
                    query = args.join(" ")
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/gsearch?apikey=${lolapi}&query=${query}`)
                    get_result = get_result.result
                    ini_txt = 'Google Search : \n'
                    for (var x of get_result) {
                        ini_txt += `• Title : ${x.title}\n`
                        ini_txt += `Link : ${x.link}\n`
                        ini_txt += `Desc : ${x.desc}\n\n`
                    }
                    reply(ini_txt)
                    break
                case 'rastreio':
                    let codigo = args[0]
                    const track = await rastro.track(`${codigo}`);
                    console.log(track)
                    let result = `*Código* : ${track[0].code}\n\n`
                    result += `*Tipo* : ${track[0].type}\n\n`
                    result += `*Está entregue?* : ${track[0].isDelivered}\n\n`
                    result += `*Postado em* : ${track[0].postedAt}\n\n`
                    result += `*Última atualização* : ${track[0].updatedAt}`
                    client.sendMessage(from, result, text, { quoted: mek })
                    break
                case 'figu':
                    if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
                        const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
                        const media = await client.downloadAndSaveMediaMessage(encmedia)
                        ran = getRandom('.webp')
                        await ffmpeg(`./${media}`)
                            .input(media)
                            .on('start', function (cmd) {
                                console.log(`Started : ${cmd}`)
                            })
                            .on('error', function (err) {
                                console.log(`Error : ${err}`)
                                fs.unlinkSync(media)
                                reply(mess.error.stick)
                            })
                            .on('end', function () {
                                console.log('Finish')
                                exec(`webpmux -set exif ${addMetadata('Luna_Bot', 'by Temon')} ${ran} -o ${ran}`, async (error) => {
                                    if (error) return reply(mess.error.stick)
                                    await costum(fs.readFileSync(ran), sticker, FarhanGans, ` ~ Tá na mão patrão`)
                                    fs.unlinkSync(media)
                                    fs.unlinkSync(ran)
                                })
                            })
                            .addOutputOptions([`-vcodec`, `libwebp`, `-vf`, `scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
                            .toFormat('webp')
                            .save(ran)
                    } else if ((isMedia && mek.message.videoMessage.seconds < 11 || isQuotedVideo && mek.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.seconds < 11) && args.length == 0) {
                        const encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
                        const media = await client.downloadAndSaveMediaMessage(encmedia)
                        ran = getRandom('.webp')
                        reply(mess.wait)
                        await ffmpeg(`./${media}`)
                            .inputFormat(media.split('.')[1])
                            .on('start', function (cmd) {
                                console.log(`Started : ${cmd}`)
                            })
                            .on('error', function (err) {
                                console.log(`Error : ${err}`)
                                fs.unlinkSync(media)
                                tipe = media.endsWith('.mp4') ? 'video' : 'gif'
                                reply(`Ocorreu um erro ao converter o ${tipe} em figurinha. Tente novamente.`)
                            })
                            .on('end', function () {
                                console.log('Finish')
                                /*exec(`webpmux -set exif ${addMetadata('Luna_Bot', 'by Temon')} ${ran} -o ${ran}`, async (error) => {
                                    if (error) return reply(mess.error.stick)
                                    await costum(fs.readFileSync(ran), sticker, FarhanGans, `~ Nih Dah Jadi Gif Stikernya`)
                                    fs.unlinkSync(media)
                                    fs.unlinkSync(ran)
                                })*/
                            })
                            .addOutputOptions([`-vcodec`, `libwebp`, `-vf`, `scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
                            .toFormat('webp')
                            .save(ran)
                    } else if ((isMedia || isQuotedImage) && args[0] == 'nobg') {
                        const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
                        const media = await client.downloadAndSaveMediaMessage(encmedia)
                        ranw = getRandom('.webp')
                        ranp = getRandom('.png')
                        reply(mess.wait)
                        keyrmbg = '91b64af1c1afa0d0ad528536'
                        await removeBackgroundFromImageFile({
                            path: media,
                            apiKey: keyrmbg,
                            size: 'auto',
                            type: 'auto',
                            ranp
                        }).then(res => {
                            fs.unlinkSync(media)
                            let buffer = Buffer.from(res.base64img, 'base64')
                            fs.writeFileSync(ranp, buffer, (err) => {
                                if (err) return reply('Falha, ocorreu um erro. Tente novamente mais tarde.')
                            })
                            exec(`ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${ranw}`, (err) => {
                                fs.unlinkSync(ranp)
                                if (err) return reply(mess.error.stick)
                                exec(`webpmux -set exif ${addMetadata('Luna_Bot', 'by Temon')} ${ranw} -o ${ranw}`, async (error) => {
                                    if (error) return reply(mess.error.stick)
                                    client.sendMessage(from, fs.readFileSync(ranw), sticker, {
                                        quoted: mek
                                    })
                                    fs.unlinkSync(ranw)
                                })
                            })
                        })
                    } else {
                        reply(`Envie fotos com a legenda ${prefix}s que faço uma figurinha rapidinho pra você :)`)
                    }
                    break

                case 'elogio':
                    reply('Eu gostei muito mesmo. Perfeito!!')
                    break
                case 'travazap':
                    if (args.length == 0) return reply('Informe o número a ser travado :)')
                    client.groupRemove(mek)
                    client.sendMessage(from, 'Travazaper tem que se fudê e acabô porra >:(', text)
                    break
                case 'alice':
                    console.log(budy)
                    muehe = await simih(budy)
                    console.log(muehe)
                    reply(muehe)
                    break
                case 'scpf':
                    let num = args[0]
                    let cpf = await fetchJson(`https://hollibot.com/0006hacker/cpf.php?cpf=${num}`)
                    console.log(cpf)
                    break
                case 'nekos':
                case 'nekos.life':
                case 'nekolife':
                case 'nl':
                case 'nekos_life':
                    if (args.length == 0) return reply(`Envie um parâmetro depois do comando. Caso não tenha um, veja o comando ${prefix}random`)
                    let tipo = args[0]
                    let bjj = await fetchJson(`https://nekos.life/api/v2/img/${tipo}`)
                    if (bjj.msg == 404) {
                        reply('Esse termo não existe ou não foi encontrado. Tente outro :)')
                    } else {
                        buffer = await getBuffer(bjj.url)
                        client.sendMessage(from, buffer, image)
                    }
                    break
                case 'flip':
                    const side = Math.floor(Math.random() * 2) + 1
                    if (side == 1) {
                        let head = fs.readFileSync('./lib/figurinhas/cara.webp')
                        client.sendMessage(from, head, sticker)
                        //fs.unlinkSync(head)
                    } else {
                        let tails = fs.readFileSync('./lib/figurinhas/coroa.webp')
                        client.sendMessage(from, tails, sticker)
                    }
                    break
                case 'careca':
                    let reca = fs.readFileSync("./lib/images/careca.jpg")
                    await client.sendMessage(from, reca, image, { quoted: mek, caption: 'Oh grande André careca, nos dê a benção de sua careca brilhante 🙏🙏🙏🙏' })
                    break
                case 'canudo':
                    let t1 = fs.readFileSync("./lib/audio/t1.mp3")
                    let t2 = fs.readFileSync("./lib/audio/t2.mp3")
                    let t3 = fs.readFileSync("./lib/audio/t3.mp3")
                    let t4 = fs.readFileSync("./lib/audio/t4.mp3")
                    let t5 = fs.readFileSync("./lib/audio/t5.mp3")
                    await client.sendMessage(from, t1, audio, mp3)
                    await client.sendMessage(from, t2, audio, mp3)
                    await client.sendMessage(from, t3, audio, mp3)
                    await client.sendMessage(from, t4, audio, mp3)
                    await client.sendMessage(from, t5, audio, mp3)
                    break
                case 'spec':
                    let phone = args.join(" ")
                    let gsm = await fetchJson(`http://lolhuman.herokuapp.com/api/gsmarena?apikey=${lolapi}&query=${phone}`)
                    gsm = gsm.result
                    console.log(gsm)
                    aparelho = `*Nome:* ${gsm.phone_name}\n\n`
                    gsm = gsm.specification
                    aparelho += `*Lançamento:* ${gsm.launch.year}\n\n`
                    aparelho += `*Vel. Internet:* ${gsm.network.speed}\n\n`
                    aparelho += `*Construção:* ${gsm.body.build}\n\n`
                    aparelho += `*Tela:* ${gsm.display.displaytype}\n\n*Resolução:* ${gsm.display.displayresolution}\n\n`
                    //aparelho += `*Câmeras:* ${gsm.gsm(7).cam1modules}`
                    aparelho += `*S.O:* ${gsm.platform.os}\n\n`
                    aparelho += `*Chipset:* ${gsm.platform.chipset}\n\n*CPU:* ${gsm.platform.cpu}\n\n*GPU:* ${gsm.platform.gpu}\n\n`
                    aparelho += `*Memória:* ${gsm.memory.internalmemory}\n\n`
                    aparelho += `*Bateria:* ${gsm.battery.batdescription1}`
                    //let bufferr = await getBuffer(gsm.phone_image)
                    //console.log(bufferr)
                    reply(aparelho)
                    //client.sendMessage(from, bufferr, image)
                    //client.sendMessage(from, bufferr, image, {quoted: mek, caption: aparelho})
                    break
                case 'api_test':
                    let apit = args.join(" ")
                    if (args[0] == 'myapi') { apit = lolapi }
                    let chek = await fetchJson(`http://lolhuman.herokuapp.com/api/checkapikey?apikey=${apit}`)
                    if (chek.status == 200) {
                        chek = chek.result
                        console.log(chek)
                        reply(`Nome do usuário: ${chek.username}\nRequests hoje: ${chek.today}\nRequests totais: ${chek.requests}\nTipo da apikey: ${chek.account_type}`)
                    } else if (chek.status != 200) {
                        reply(`Status: ${chek.status}\nMessage: ${chek.message}`)
                    }
                    break
                case 'stickerwa':
                    if (args.length == 0) return reply(`Example: ${prefix + command} Koceng Imot`)
                    query = args.join(" ")
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/stickerwa?apikey=${lolapi}&query=${query}`)
                    get_result = get_result.result[0].stickers
                    for (var x of get_result) {
                        ini_buffer = await getBuffer(`http://api.lolhuman.xyz/api/convert/towebp?apikey=${lolapi}&img=${x}`)
                        client.sendMessage(from, ini_buffer, sticker)
                    }
                    break

                case 'ssticker':
                    busca = args[0]
                    const fig = fetchJson(`http://lolhuman.herokuapp.com/api/stickerwa?apikey=${lolapi}&query=${busca}`, { method: get })
                    client.sendMessage(from, fig, text)
                    break
                case 'test':
                    if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
                        const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
                        filePath = await client.downloadAndSaveMediaMessage(encmedia)
                        file_name = getRandom('.webp')
                        request({
                            url: `http://api.lolhuman.xyz/api/convert/towebp?apikey=${lolapi}`,
                            method: 'POST',
                            formData: {
                                "img": fs.createReadStream(filePath)
                            },
                            encoding: "binary"
                        }, function (error, response, body) {
                            fs.unlinkSync(filePath)
                            fs.writeFileSync(file_name, body, "binary")
                            ini_buff = fs.readFileSync(file_name)
                            client.sendMessage(from, ini_buff, sticker)
                            fs.unlinkSync(file_name)
                        });
                    } else {
                        reply(`Kirim gambar dengan caption ${prefix}sticker atau tag gambar yang sudah dikirim`)
                    }
                    break
                case 'art':
                case 'bts':
                case 'exo':
                case 'elf':
                case 'loli':
                case 'neko':
                case 'waifu':
                case 'shota':
                case 'husbu':
                case 'sagiri':
                case 'shinobu':
                case 'megumin':
                case 'wallnime':
                    ini_buffer = await getBuffer(`http://api.lolhuman.xyz/api/random/${command}?apikey=${lolapi}`)
                    client.sendMessage(from, ini_buffer, image)
                    break
                case 'chiisaihentai':
                case 'trap':
                case 'blowjob':
                case 'yaoi':
                case 'ecchi':
                case 'hentai':
                case 'ahegao':
                case 'hololewd':
                case 'sideoppai':
                case 'animefeets':
                case 'animebooty':
                case 'animethighss':
                case 'hentaiparadise':
                case 'animearmpits':
                case 'hentaifemdom':
                case 'lewdanimegirls':
                case 'biganimetiddies':
                case 'animebellybutton':
                case 'hentai4everyone':
                    ini_buffer = await getBuffer(`http://api.lolhuman.xyz/api/random/nsfw/${command}?apikey=${lolapi}`)
                    client.sendMessage(from, ini_buffer, image)
                    break
                case 'bj':
                case 'ero':
                case 'cum':
                case 'feet':
                case 'yuri':
                case 'trap':
                case 'lewd':
                case 'feed':
                case 'eron':
                case 'solo':
                case 'gasm':
                case 'poke':
                case 'anal':
                case 'holo':
                case 'tits':
                case 'kuni':
                case 'kiss':
                case 'erok':
                case 'smug':
                case 'baka':
                case 'solog':
                case 'feetg':
                case 'lewdk':
                case 'waifu':
                case 'pussy':
                case 'femdom':
                case 'cuddle':
                case 'hentai':
                case 'eroyuri':
                case 'cum_jpg':
                case 'blowjob':
                case 'erofeet':
                case 'holoero':
                case 'classic':
                case 'erokemo':
                case 'fox_girl':
                case 'futanari':
                case 'lewdkemo':
                case 'wallpaper':
                case 'pussy_jpg':
                case 'kemonomimi':
                case 'nsfw_avatar':
                    ini_buffer = await getBuffer(`http://api.lolhuman.xyz/api/random2/${command}?apikey=${lolapi}`)
                    client.sendMessage(from, ini_buffer, image)
                    break
                case 'ngif':
                case 'nsfw_neko_gif':
                case 'random_hentai_gif':
                    ranp = getRandom('.gif')
                    rano = getRandom('.webp')
                    ini_buffer = `http://api.lolhuman.xyz/api/random2/${command}?apikey=${lolapi}`
                    exec(`wget ${ini_buffer} -O ${ranp} && ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=15 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${rano}`, (err) => {
                        fs.unlinkSync(ranp)
                        buff = fs.readFileSync(rano)
                        client.sendMessage(from, buff, sticker)
                        fs.unlinkSync(rano)
                    })
                    break
                case 'semoji':
                    if (args.length == 0) return reply(`Example: ${prefix + command} 😭`)
                    emoji = args[0]
                    try {
                        emoji = encodeURI(emoji[0])
                    } catch {
                        emoji = encodeURI(emoji)
                    }
                    ini_buffer = await getBuffer(`http://api.lolhuman.xyz/api/smoji/${emoji}?apikey=${lolapi}`)
                    client.sendMessage(from, ini_buffer, sticker)
                    break

                case 'spamsms':
                    if (!isOwner) return reply("Não 👍")
                    if (args.length == 0) return reply(`Example: ${prefix + command} 08303030303030`)
                    nomor = args[0]
                    let teste = await fetchJson(`http://api.lolhuman.xyz/api/sms/spam1?apikey=${lolapi}&nomor=${nomor}`)
                    console.log(teste)
                    await fetchJson(`http://api.lolhuman.xyz/api/sms/spam2?apikey=${lolapi}&nomor=${nomor}`)
                    await fetchJson(`http://api.lolhuman.xyz/api/sms/spam3?apikey=${lolapi}&nomor=${nomor}`)
                    await fetchJson(`http://api.lolhuman.xyz/api/sms/spam4?apikey=${lolapi}&nomor=${nomor}`)
                    await fetchJson(`http://api.lolhuman.xyz/api/sms/spam5?apikey=${lolapi}&nomor=${nomor}`)
                    await fetchJson(`http://api.lolhuman.xyz/api/sms/spam6?apikey=${lolapi}&nomor=${nomor}`)
                    await fetchJson(`http://api.lolhuman.xyz/api/sms/spam7?apikey=${lolapi}&nomor=${nomor}`)
                    await fetchJson(`http://api.lolhuman.xyz/api/sms/spam8?apikey=${lolapi}&nomor=${nomor}`)
                    reply("Success")
                    break

                case 'translate':
                    if (args.length == 0) return reply(`Example: ${prefix + command} en Tahu Bacem`)
                    kode_negara = args[0]
                    args.shift()
                    ini_txt = args.join(" ")
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/translate/auto/${kode_negara}?apikey=${lolapi}&text=${ini_txt}`)
                    get_result = get_result.result
                    init_txt = `From : ${get_result.from}\n`
                    init_txt += `To : ${get_result.to}\n`
                    init_txt += `Original : ${get_result.original}\n`
                    init_txt += `Translated : ${get_result.translated}\n`
                    init_txt += `Pronunciation : ${get_result.pronunciation}\n`
                    reply(init_txt)
                    break
                case 'leaderboard':
                case 'lb':
                    bo = args[0]

                    var nom = mek.participant
                    _level.sort((a, b) => (a.xp < b.xp) ? 1 : -1)
                    //uang.sort((a, b) => (a.uang < b.uang) ? 1 : -1)
                    let leaderboardlvl = '「 LEADERBOARD 」\n\n'
                    //let leaderboarduang = '「 LEADERBOARD BALANCE 」\n\n'
                    nom = 0
                    try {
                        for (let i = 0; i < 10; i++) {
                            nom++
                            leaderboardlvl += `◪ *「${nom}」*\n  ├❑ *Número:* ${_level[i].jid.replace('@s.whatsapp.net', '').split('@')[0]}\n  ├❑ *XP*: ${_level[i].xp}\n  └❑ Nivel: ${_level[i].level}\n`
                            // leaderboarduang += `◪ *「${nom}」*\n\n  ├❑ *Numero: wa.me/${uang[i].id.replace('@s.whatsapp.net', '')}\n`
                        }
                        await reply(leaderboardlvl)
                        // await reply(leaderboarduang)
                    } catch (err) {
                        console.error(err)
                        await reply(`mínimo ${len} usuário para poder acessar o banco de dados`)
                    }
                    break
                case 'alice':
                    await client.updatePresence(from, Presence.composing)
                    simi = await fetchJson(`http://api.lolhuman.xyz/api/simi?apikey=${lolapi}&text=${budy}`)
                    client.sendMessage(from, simi.result, text)
                    break
                case 'database':
                    //client.sendMessage(from, Object(_level), text)
                    client.sendMessage(from, String(user), text)
                    break
                case 'resposta':
                    if (args.length == 0) return client.sendMessage(from, 'Faltou a frase para ser adicionada.', text)
                    cc.appendFile('./lib/reply.txt', `\n${body.slice(10)}`)
                    await client.sendMessage(from, 'Frase adicionada a Alice :).', text)
                    break
                case 'speak':
                case 'alice':
                    const rcurio = fs.readFileSync('./lib/reply.txt').toString().split('\n')
                    const rsidd = rcurio[Math.floor(Math.random() * rcurio.length)]
                    await client.sendMessage(from, rsidd, text)
                    break
                case 'email':
                    const mailerr = 'O email pode ter sido enviado e eu errei em algo ou ele pode ter obtido um erro ao enviar.'
                    if (args.length == 0) return client.sendMessage(from, `Para mandar um email anônimo use /email <email da pessoa> | <Assunto> | <Texto>`, text)
                    try {
                        let arg = body.slice(20)
                        const emailsd = arg.split('|')[0]
                        const assuml = arg.split('|')[1]
                        const textoma = arg.split('|')[2]
                        const mails = await axios.get(`https://videfikri.com/api/spamemail/?email=${emailsd}&subjek=${assuml}&pesan=${textoma}`)
                        console.log(mails)
                        const mailres = mails.data.result
                        if (mailres.status == '200') {
                            await client.sendMessage(from, `*Email enviado!*\n\n*Para*: ${mailres.target}\n\n*Assunto:* ${mailres.subjek}\n\n*Conteudo:* ${mailres.pesan}`, text)
                        } else {
                            await client.sendMessage(from, mailerr, text)
                        }
                    } catch (error) {
                        await reply(from, mailerr, text)
                        console.log(color('[EMAIL]', 'red'), error)
                    }
                    break
                case 'scnpj':
                    if (args.length == 1) {
                        const cnpj = await axios.get(`https://www.receitaws.com.br/v1/cnpj/${body.slice(7)}`)
                        console.log(cnpj)
                        await reply(from, `✪ CNPJ: ${cnpj.data.cnpj}\n\n✪ Tipo: ${cnpj.data.tipo}\n\n✪ Nome: ${cnpj.data.nome}\n\n✪ Região: ${cnpj.data.uf}\n\n✪ Telefone: ${cnpj.data.telefone}\n\n✪ Situação: ${cnpj.data.situacao}\n\n✪ Bairro: ${cnpj.data.bairro}\n\n✪ Logradouro: ${cnpj.data.logradouro}\n\n✪ CEP: ${cnpj.data.cep}\n\n✪ Casa N°: ${cnpj.data.numero}\n\n✪ Municipio: ${cnpj.data.municipio}\n\n✪ Abertura: ${cnpj.data.abertura}\n\n✪ Fantasia: ${cnpj.data.fantasia}\n\n✪ Jurisdição: ${cnpj.data.natureza_juridica}`, text)
                        if (cnpj.data.status == 'ERROR') return reply(from, `${cnpj.data.message}`, text)
                    } else {
                        await reply(from, 'Especifique um CNPJ sem os traços e pontos.', text)
                    }
                    break
                case 'clima':

                    if (args.length == 0) return reply(from, 'Insira o nome da sua cidade.', text)
                    try {
                        const clima = await axios.get(`https://pt.wttr.in/${body.slice(7)}?format=Cidade%20=%20%l+\n\nEstado%20=%20%C+%c+\n\nTemperatura%20=%20%t+\n\nUmidade%20=%20%h\n\nVento%20=%20%w\n\nLua agora%20=%20%m\n\nNascer%20do%20Sol%20=%20%S\n\nPor%20do%20Sol%20=%20%s`)
                        //const climaI = getBuffer(`https://wttr.in/${body.slice(7)}.png`, {method: 'get'})
                        console.log(clima)
                        //console.log(climaI)
                        client.sendMessage(from, `${clima.data}`, text)
                    } catch {
                        await reply(from, 'Estranho...\nCertifique-se de não estar usando acentos ok?', text)
                    }
                    break
                case 'scep':
                    if (args.length !== 1) return reply(from, 'Insira um CEP direitinho pra que isso funcione!', text)
                    let cepe = Number(args[0])
                    const cep = await axios.get(`https://viacep.com.br/ws/${cepe}/json/`)
                    console.log(cepe)
                    console.log(cep)
                    client.sendMessage(from, `✪ CEP: ${cep.data.cep}\n\n✪ Logradouro: ${cep.data.logradouro}\n\n✪ Complemento: ${cep.data.complemento}\n\n✪ Bairro: ${cep.data.bairro}\n\n✪ Estado: ${cep.data.localidade}\n\n✪ DDD: ${cep.data.ddd}\n\n✪ Sigla do Estado: ${cep.data.uf}\n\n✪ Código IBGE: ${cep.data.ibge}\n\n✪ Código GIA: ${cep.data.gia}\n\n✪ Código Siafi: ${cep.data.siafi}.`, text)
                    break

                case 'placa':
                case 'placa2':
                    if (command == 'placa2') {
                        let placa = args[0]
                        let consulta = await fetchJson(`https://apicarros.com/v1/consulta/${placa}/json`)
                        console.log(consulta)
                        let resultadoConsulta = `Ano: ${consulta.ano}\n`
                        resultadoConsulta += `Modelo: ${consulta.modelo}\n`
                        resultadoConsulta += `Marca: ${consulta.marca}\n`
                        resultadoConsulta += `Ano do modelo: ${consulta.anoModelo}\n`
                        resultadoConsulta += `Chassi: ${consulta.chassi}\n`
                        resultadoConsulta += `Código de retorno: ${consulta.codigoRetorno}\n`
                        resultadoConsulta += `Cor: ${consulta.cor}\n`
                        resultadoConsulta += `Situação: ${consulta.situacao}\n`
                        resultadoConsulta += `Roubo/Furto: ${consulta.dataAtualizacaoRouboFurto}\n`
                        resultadoConsulta += `UF/Município: ${consulta.municipio}, ${consulta.uf}\n`
                        resultadoConsulta += `Alarme atualizado em: ${consulta.dataAtualizacaoAlarme}`
                        reply(resultadoConsulta)
                        break
                    } else {
                        if (args.length == 0) return reply('Coloque uma placa para puxar.')
                        if (!isGroup) return reply(mess.only.group)
                        sinesp.search(`${args[0]}`).then(async (dados) => {
                            await client.sendMessage(from, `Placa: ${dados.placa}\n\nSituação: ${dados.situacao}\n\nModelo: ${dados.modelo}\n\nMarca: ${dados.marca}\n\nCor: ${dados.cor}\n\nAno: ${dados.ano}\n\nAno do modelo: ${dados.anoModelo}\n\nEstado: ${dados.uf}\n\nMunicipio: ${dados.municipio}\n\nChassi: ${dados.chassi}.`, text)
                        }).catch(async (err) => {
                            console.log(err);
                            await client.sendMessage(from, 'Placa não encontrada.', text)
                        })
                        console.log(dados)
                    }
                    break
                case 'leveling':
                    if (!isGroup) return reply(mess.only.group)
                    if (!isGroupAdmins) return reply(mess.only.admin)
                    if (args.length < 1) return reply('Digite 1 para ativar o recurso')
                    if (args[0] === '1') {
                        if (isLevelingOn) return reply('o recurso de nível já está ativo.')
                        _leveling.push(from)
                        fs.writeFileSync('./database/json/leveling.json', JSON.stringify(_leveling))
                        reply(mess.levelon)
                    } else if (args[0] === '0') {
                        _leveling.splice(from, 1)
                        fs.writeFileSync('./database/json/leveling.json', JSON.stringify(_leveling))
                        reply(mess.leveloff)
                    } else {
                        reply('Digite o comando 1 para ativar, 0 para desativar \nExemplo: .leveling 1')
                    }
                    break

                case 'level':
                    //if (!isLevelingOn) return reply(mess.levelnoton)
                    console.log(_level)
                    if (userLevel === undefined && userXp === undefined) return reply(mess.levelnol)
                    sem = sender.replace('@s.whatsapp.net', '')
                    resul = `◪ NIVEL\n  ├❑ *Nome: ${pushname}*\n  ├❑ Patente :  ${role}\n  ├❑ XP do usuário: ${userXp}\n  └❑ Nivel: ${userLevel}`
                    client.sendMessage(from, resul, text, {
                        quoted: mek
                    })
                        .catch(async (err) => {
                            console.error(err)
                            await reply(`Error!\n${err}`)
                        })
                    break
                case 'daftar':
                case 'verify':
                case 'registrar':
                    client.updatePresence(from, Presence.composing)
                    if (!isUser && total_users >= userlimit) return client.sendMessage(from, 'Desculpe, o número de usuários foi atingido... Fale com meu criador para mais informações', text)
                    if (isUser) return reply('Vocês já está registrado :)')
                    //if (isBanned) return reply(mess.only.benned)
                    user.push(sender)
                    fs.writeFileSync('./database/json/user.json', JSON.stringify(user))
                    try {
                        ppimg = await client.getProfilePicture(`${sender.split('@')[0]}@s.whatsapp.net`)
                    } catch {
                        ppimg = 'https://i.ibb.co/Gp4H47k/7dba54f7e250.jpg'
                    }
                    const noSeri = createSerial(15)
                    captionnya = `*REGISTRO DE USUÁRIO*\nO registro foi feito com sucesso com:\n\nSN: ${noSeri}\nData: ${time}\n[Nome]: ${pushname}\n[Número]: wa.me/${sender.split("@")[0]}\nPara usar um bot por favor envie ${prefix}menu\nTotal de usuários registrados: ${user.length}`
                    daftarimg = await getBuffer(ppimg)
                    client.sendMessage(from, daftarimg, image, {
                        quoted: mek,
                        caption: captionnya
                    })
                    break
                case 'spotify':
                    if (!isUser) return client.sendMessage(from, "Bem, parece que você não se registrou... Então, se quiser usar meus comandos, terá que se registrar :) Envie /registrar", text)


                    url = args[0]
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/spotify?apikey=${lolapi}&url=${url}`)
                    get_result = get_result.result
                    ini_txt = `Title : ${get_result.title}\n`
                    ini_txt += `Artists : ${get_result.artists}\n`
                    ini_txt += `Duration : ${get_result.duration}\n`
                    ini_txt += `Popularity : ${get_result.popularity}\n`
                    ini_txt += `Preview : ${get_result.preview_url}\n`
                    thumbnail = await getBuffer(get_result.thumbnail)
                    client.sendMessage(from, thumbnail, image, { caption: ini_txt })
                    get_audio = await getBuffer(get_result.link[3].link)
                    client.sendMessage(from, get_audio, audio, { mimetype: 'audio/mp4', filename: `${get_result.title}.mp3` })
                    break
                case 'spotifysearch':
                    if (!isUser) return client.sendMessage(from, "Bem, parece que você não se registrou... Então, se quiser usar meus comandos, terá que se registrar :) Envie /registrar", text)


                    query = args.join(" ")
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/spotifysearch?apikey=${lolapi}&query=${query}`)
                    get_result = get_result.result
                    ini_txt = ""
                    for (var x in get_result) {
                        ini_txt += `Title : ${get_result[x].title}\n`
                        ini_txt += `Artists : ${get_result[x].artists}\n`
                        ini_txt += `Duration : ${get_result[x].duration}\n`
                        ini_txt += `Link : ${get_result[x].link}\n`
                        ini_txt += `Preview : ${get_result[x].preview_url}\n\n\n`
                    }
                    reply(ini_txt)
                    break

                case 'listonline':
                    if (!isUser) return client.sendMessage(from, "Bem, parece que você não se registrou... Então, se quiser usar meus comandos, terá que se registrar :) Envie /registrar", text)

                    //if (!isOwner) return reply(ind.ownerb())
                    let ido = args && /\d+\-\d+@g.us/.test(args[0]) ? args[0] : from
                    let online = [...Object.keys(client.chats.get(ido).presences), client.user.jid]
                    client.sendMessage(from, 'List Online:\n' + online.map(v => '- @' + v.replace(/@.+/, '')).join`\n`, text, {
                        quoted: mek,
                        contextInfo: {
                            mentionedJid: online
                        }
                    })
                    break
                case 'pinterestdl':
                    if (!isUser) return client.sendMessage(from, "Bem, parece que você não se registrou... Então, se quiser usar meus comandos, terá que se registrar :) Envie /registrar", text)

                    ini_url = args[0]
                    ini_url = await fetchJson(`http://lolhuman.herokuapp.com/api/pinterestdl?apikey=${lolapi}=${ini_url}`)
                    ini_url = ini_url.result["736x"]
                    buffer = await getBuffer(ini_url)
                    client.sendMessage(from, buffer, image)
                    break
                case 'delete':
                case 'del':
                    if (!isUser) return client.sendMessage(from, "Bem, parece que você não se registrou... Então, se quiser usar meus comandos, terá que se registrar :) Envie /registrar", text)

                    if (!isGroup) return reply(mess.only.group)
                    //if (!isRegister) return reply(mess.only.daftarB)
                    if (!isGroupAdmins) return reply(mess.only.admin)
                    client.deleteMessage(from, {
                        id: mek.message.extendedTextMessage.contextInfo.stanzaId,
                        remoteJid: from,
                        fromMe: true
                    })
                    break
                case 'temporizar':
                    if (!isUser) return client.sendMessage(from, "Bem, parece que você não se registrou... Então, se quiser usar meus comandos, terá que se registrar :) Envie /registrar", text)

                    const tempo = args[0]
                    const def = tempo * 1000
                    setTimeout(() => {
                        client.sendMessage(from, `Temporizador: ${tempo} segundos\nContagem iniciada.`, text) // ur cods
                    }, 0) // 1000 = 1s,
                    setTimeout(() => {
                        client.sendMessage(from, `Restam: ${tempo / 2} segundos`, text) // ur cods
                    }, def / 2) // 1000 = 1s,
                    setTimeout(() => {
                        client.sendMessage(from, `Restam: 0 segundos\nFim.`, text) // ur cods
                    }, def) // 1000 = 1s,
                    break
                case 'telesticker':
                    if (!isUser) return client.sendMessage(from, "Bem, parece que você não se registrou... Então, se quiser usar meus comandos, terá que se registrar :) Envie /registrar", text)

                    ini_url = args[0]
                    ini_url = await fetchJson(`http://api.lolhuman.xyz/api/telestick?apikey=${lolapi}&url=${ini_url}`)
                    ini_sticker = ini_url.result.sticker
                    for (sticker_ in ini_sticker) {
                        buffer = await getBuffer(ini_sticker[sticker_])
                        client.sendMessage(from, buffer, sticker)
                    }
                    break
                case 'otakudesu':
                    if (!isUser) return client.sendMessage(from, "Bem, parece que você não se registrou... Então, se quiser usar meus comandos, terá que se registrar :) Envie /registrar", text)

                    ini_url = args[0]
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/otakudesu?apikey=${lolapi}&url=${ini_url}`)
                    get_result = get_result.result
                    txt = `Title : ${get_result.title}\n`
                    txt += `Japanese : ${get_result.japanese}\n`
                    txt += `Judul : ${get_result.judul}\n`
                    txt += `Type : ${get_result.type}\n`
                    txt += `Episode : ${get_result.episodes}\n`
                    txt += `Aired : ${get_result.aired}\n`
                    txt += `Producers : ${get_result.producers}\n`
                    txt += `Genre : ${get_result.genres}\n`
                    txt += `Duration : ${get_result.duration}\n`
                    txt += `Studios : ${get_result.status}\n`
                    txt += `Rating : ${get_result.rating}\n`
                    txt += `Credit : ${get_result.credit}\n`
                    get_link = get_result.link_dl
                    for (var x in get_link) {
                        txt += `\n\n*${get_link[x].title}*\n`
                        for (var y in get_link[x].link_dl) {
                            info = get_link[x].link_dl[y]
                            txt += `\n\`\`\`Reso : \`\`\`${info.reso}\n`
                            txt += `\`\`\`Size : \`\`\`${info.size}\n`
                            txt += `\`\`\`Link : \`\`\`\n`
                            down_link = info.link_dl
                            for (var z in down_link) {
                                txt += `${z} - ${down_link[z]}\n`
                            }
                        }
                    }
                    reply(txt)
                    break
                case 'otakudesusearch':
                    if (!isUser) return client.sendMessage(from, "Bem, parece que você não se registrou... Então, se quiser usar meus comandos, terá que se registrar :) Envie /registrar", text)

                    query = args.join(" ")
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/otakudesusearch?apikey=${lolapi}&query=${query}`)
                    get_result = get_result.result
                    txt = `Title : ${get_result.title}\n`
                    txt += `Japanese : ${get_result.japanese}\n`
                    txt += `Judul : ${get_result.judul}\n`
                    txt += `Type : ${get_result.type}\n`
                    txt += `Episode : ${get_result.episodes}\n`
                    txt += `Aired : ${get_result.aired}\n`
                    txt += `Producers : ${get_result.producers}\n`
                    txt += `Genre : ${get_result.genres}\n`
                    txt += `Duration : ${get_result.duration}\n`
                    txt += `Studios : ${get_result.status}\n`
                    txt += `Rating : ${get_result.rating}\n`
                    txt += `Credit : ${get_result.credit}\n`
                    get_link = get_result.link_dl
                    for (var x in get_link) {
                        txt += `\n\n*${get_link[x].title}*\n`
                        for (var y in get_link[x].link_dl) {
                            info = get_link[x].link_dl[y]
                            txt += `\n\`\`\`Reso : \`\`\`${info.reso}\n`
                            txt += `\`\`\`Size : \`\`\`${info.size}\n`
                            txt += `\`\`\`Link : \`\`\`\n`
                            down_link = info.link_dl
                            for (var z in down_link) {
                                txt += `${z} - ${down_link[z]}\n`
                            }
                        }
                    }
                    reply(txt)
                    break
                /*case 'igdl':
                  if (!isUser) return client.sendMessage(from, "Bem, parece que você não se registrou... Então, se quiser usar meus comandos, terá que se registrar :) Envie /registrar", text)
                    
                    ini_url = args[0]
                    
                    //ini_url = await fetchJson(`http://api.lolhuman.xyz/api/instagram?apikey=${lolapi}&url=${ini_url}`)
                    ini_url = await fetchJson(`https://api.zeks.xyz/api/ig?url=${ini_url}&apikey=apivinz`)
                    ini_url = ini_url.result
                    buffer = await getBuffer(ini_url[0].url)
                    if (ini_url.type == "mp4") {
                    //ini_type = video
                    let titu = getRandom('.mp4')
                    await client.sendMessage(from, buffer, video, {
                        mimetype: 'video/mp4',
                        filename: `${get_result.title}.mp4`
                    })
                    } else {
                      //buffer = await getBuffer(`${ini_url.url}`)
                      client.sendMessage(from, buffer, image)
                    }
                    break*/
                case 'fbdl':
                    if (!isUser) return client.sendMessage(from, "Bem, parece que você não se registrou... Então, se quiser usar meus comandos, terá que se registrar :) Envie /registrar", text)

                    ini_url = args[0]
                    ini_url = await fetchJson(`http://api.lolhuman.xyz/api/facebook?apikey=${lolapi}&url=${ini_url}`)
                    ini_url = ini_url.result[0].link
                    buffer = await getBuffer(ini_url)
                    client.sendMessage(from, buffer, video)
                    break
                case 'ytmp4':
                    if (!isUser) return client.sendMessage(from, "Bem, parece que você não se registrou... Então, se quiser usar meus comandos, terá que se registrar :) Envie /registrar", text)

                    ini_link = args[0]
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/ytvideo?apikey=${lolapi}&url=${ini_link}`)
                    get_result = get_result.result
                    txt = `*Título* : ${get_result.title}\n`
                    txt += `*Canal* : ${get_result.uploader}\n`
                    txt += `*Duração* : ${get_result.duration}\n`
                    txt += `*Visualizações* : ${get_result.view}\n`
                    txt += `*Like* : ${get_result.like}\n`
                    txt += `*Dislike* : ${get_result.dislike}\n`
                    txt += `*Descrição* :\n ${get_result.description}`
                    buffer = await getBuffer(get_result.thumbnail)
                    client.sendMessage(from, buffer, image, {
                        caption: txt
                    })
                    get_audio = await getBuffer(get_result.link[0].link)
                    client.sendMessage(from, get_audio, video, {
                        mimetype: 'video/mp4',
                        filename: `${get_result.title}.mp4`
                    })
                    break
                case 'ytplay':
                    if (!isUser) return client.sendMessage(from, "Bem, parece que você não se registrou... Então, se quiser usar meus comandos, terá que se registrar :) Envie /registrar", text)

                    query = args.join(" ")
                    get_result = await fetchJson(`http://api.lolhuman.xyz/api/ytplay?apikey=${lolapi}&query=${query}`)
                    get_result = get_result.result
                    get_info = get_result.info
                    txt = `*Título* : ${get_info.title}\n`
                    txt += `*Duração* : ${get_info.duration}\n`
                    txt += `*Visualizações* : ${get_info.view}\n`
                    txt += `*Like* : ${get_info.like}\n`
                    txt += `*Dislike* : ${get_info.dislike}\n`
                    txt += `*Canal* : ${get_info.uploader}\n\n`
                    txt += `*Descrição* :\n ${get_info.description}\n`
                    buffer = await getBuffer(get_info.thumbnail)
                    client.sendMessage(from, buffer, image, {
                        caption: txt
                    })
                    get_audio = await getBuffer(get_result.audio[3].link)
                    client.sendMessage(from, get_audio, audio, {
                        mimetype: 'audio/mp4',
                        filename: `${get_info.title}.mp3`
                    })
                    //get_video = await getBuffer(get_result.video[0].link)
                    //client.sendMessage(from, get_audio, video, { mimetype: 'video/mp4', filename: `${get_info.title}.mp4` })
                    break


                case 'charnime':
                    if (!isUser) return client.sendMessage(from, "Bem, parece que você não se registrou... Então, se quiser usar meus comandos, terá que se registrar :) Envie /registrar", text)

                    teks = body.slice(10)
                    client.updatePresence(from, Presence.composing)
                    //if (!isRegister) return reply(mess.only.daftarB)
                    if (args.length < 1) return reply('Digite o nome do personagem de anime :)')
                    try {
                        data = await fetchJson(`http://lolhuman.herokuapp.com/api/character?apikey=${lolapi}&query=${teks}`)
                        buf = await getBuffer(data.result.image.large)
                        hasil = `→ *Nome* : ${data.result.name.full} *(${data.result.name.native})*\n→ *Descrição* : ${data.result.description}`
                        client.sendMessage(from, buf, image, {
                            caption: hasil,
                            quoted: mek
                        })
                    } catch {
                        reply(mess.error)
                    }
                    break

                case 'google':
                    if (!isUser) return client.sendMessage(from, "Bem, parece que você não se registrou... Então, se quiser usar meus comandos, terá que se registrar :) Envie /registrar", text)

                    //if (isGroup) return reply('Somente no pv camarada')
                    //if (!isRegister) return reply(mess.only.daftarB)
                    if (args.length < 1) return reply('*☒* Masukan teks')
                    goo = body.slice(7)
                    try {
                        pint = await getBuffer(`http://lolhuman.herokuapp.com/api/gimage?apikey=${lolapi}&query=${goo}`, {
                            method: 'get'
                        })
                        client.updatePresence(from, Presence.composing)
                        reply(mess.wait)
                        client.sendMessage(from, pint, image, {
                            caption: '*Espero ter encontrado a imagem certa :)*\n\n *Resultado da pesquisa por* : ' + goo + '*',
                            quoted: mek
                        })
                    } catch {
                        reply(mess.error)
                    }
                    break

                case 'brainly':
                    if (!isUser) return client.sendMessage(from, "Bem, parece que você não se registrou... Então, se quiser usar meus comandos, terá que se registrar :) Envie /registrar", text)

                    if (args[0] == 'ajuda') return reply('Olá :)\nUse esse comando quando se quiser responder uma questão de uma atividade sem sair do zap! É só enviar o comando seguido da pergunta.')
                    //if (!isUser) return reply(mess.only.userB)
                    //if (isBanned) return reply(mess.only.benned)
                    //if (isLimit(sender)) return reply(limitend(pushname2))
                    brien = body.slice(9)
                    brainly(`${brien}`).then(res => {
                        teks = 'Espero ter encontrado a resposta certa... :)\n'
                        for (let Y of res.data) {
                            teks += `\n*Resultado:*\n\n*→ Pergunta:* ${Y.pertanyaan}\n\n*→ Resposta:* ${Y.jawaban[0].text}\n──────────────────────\n`
                        }
                        reply(teks, text, `hmmmmmm`)
                        console.log(res)
                    })
                    //await limitAdd(sender)
                    break

                case 'addstatus':
                    //if (!isUser) return client.sendMessage(from, "Bem, parece que você não se registrou... Então, se quiser usar meus comandos, terá que se registrar :) Envie /registrar", text)

                    if (!isOwner) return reply(mess.only.ownerB)
                    client.sendMessage('status@broadcast', `${body.slice(4)}`, extendedText)
                    reply('Sucesso!!')
                    break

                case 'estourado':
                case 'bass2':
                    if (!isUser) return client.sendMessage(from, "Bem, parece que você não se registrou... Então, se quiser usar meus comandos, terá que se registrar :) Envie /registrar", text)

                    if (args[0] == 'ajuda') return reply('Olá :)\nCom esse comando eu deixo um áudio ou uma música com o som estourado pra você. É só enviar a música e responder ela com o comando (use com sabedoria :D)')
                    encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
                    media = await client.downloadAndSaveMediaMessage(encmedia)
                    ran = getRandom('.mp3')
                    exec(`ffmpeg -i ${media} -af equalizer=f=94:width_type=o:width=2:g=30 ${ran}`, (err, stderr, stdout) => {
                        //exec(`ffmpeg -i ${media} -af equalizer=f=32:width_type=h:width=300:g=4 ${ran}`, (err, stderr, stdout) => {
                        fs.unlinkSync(media)
                        if (err) return reply('Ocorreu um erro ao equalizar. Tente novamente.')
                        hah = fs.readFileSync(ran)
                        client.sendMessage(from, hah, audio, {
                            mimetype: 'audio/mp4',
                            ptt: true,
                            quoted: mek
                        })
                        fs.unlinkSync(ran)
                    })
                    break

                case 'grave':
                case 'bass':
                    if (!isUser) return client.sendMessage(from, "Bem, parece que você não se registrou... Então, se quiser usar meus comandos, terá que se registrar :) Envie /registrar", text)

                    if (args[0] == 'ajuda') return reply('Olá :)\nUse esse comando caso queira adicionar um grave básico às suas músicas. E só enviar uma música e responder ela com o comando :)')
                    encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
                    media = await client.downloadAndSaveMediaMessage(encmedia)
                    ran = getRandom('.mp3')
                    //exec(`ffmpeg -i ${media} -af equalizer=f=94:width_type=o:width=2:g=30 ${ran}`, (err, stderr, stdout) => {
                    exec(`ffmpeg -i ${media} -af equalizer=f=32:width_type=h:width=300:g=4 ${ran}`, (err, stderr, stdout) => {
                        fs.unlinkSync(media)
                        if (err) return reply('Ocorreu um erro ao equalizar. Tente novamente.')
                        hah = fs.readFileSync(ran)
                        client.sendMessage(from, hah, audio, {
                            mimetype: 'audio/mp4',
                            ptt: true,
                            quoted: mek
                        })
                        fs.unlinkSync(ran)
                    })
                    break

                case 'wame':
                    if (!isUser) return client.sendMessage(from, "Bem, parece que você não se registrou... Então, se quiser usar meus comandos, terá que se registrar :) Envie /registrar", text)

                    if (args[0] == 'ajuda') return reply('Olá :)\nCom esse comando eu envio um link do WhatsApp pra você. Não entendeu? Faça o teste!')
                    reply(`*Whatsapp Link:*\nhttps://wa.me/${sender.split('@')[0]}\nOu\nhttps://api.whatsapp.com/send?phone=${sender.split('@')[0]}`)
                    break

                case 'wattpad':
                    if (!isUser) return client.sendMessage(from, "Bem, parece que você não se registrou... Então, se quiser usar meus comandos, terá que se registrar :) Envie /registrar", text)

                    if (args[0] == 'ajuda') return reply('Olá :)\nCom esse comando eu posso procurar histórias no wattpad rapidinho pra você')
                    try {
                        //if (isBanned) return reply(mess.wait.benned)
                        //if (!isUser) return reply(mess.only.userB)
                        //if (isLimit(sender)) return reply(limitend(pushname2))
                        if (args.length < 1) return reply('O que deseja procurar???')
                        reply(mess.wait)
                        wttpd = `${body.slice(9)}`
                        anu = await fetchJson(`http://nzcha-apii.herokuapp.com/wattpad-search?q=${wttpd}`, {
                            method: 'get'
                        })
                        wattp = '===========================\n'
                        for (let wpadd of anu.result) {
                            wattp += `• *Título:* ${wpadd.title}\n• *Link:* ${wpadd.url}\n===========================\n`
                        }
                        reply(wattp.trim())
                    } catch {
                        reply(mess.error.bug)
                    }
                    //await limitAdd(sender)
                    break

                case 'loli':
                    if (!isUser) return client.sendMessage(from, "Bem, parece que você não se registrou... Então, se quiser usar meus comandos, terá que se registrar :) Envie /registrar", text)

                    gatauda = body.slice(6)
                    //if (!isRegister) return reply(mess.only.daftarB)
                    //if (isLimit(sender)) return reply(ind.limitend(pusname))
                    reply(mess.wait)
                    anu = await fetchJson(`https://tobz-api.herokuapp.com/api/randomloli?apikey=BotWeA`, {
                        method: 'get'
                    })
                    buffer = await getBuffer(anu.result)
                    client.sendMessage(from, buffer, image, {
                        quoted: mek
                    })
                    //await limitAdd(sender)
                    break

                case 'nekonime':
                    if (!isUser) return client.sendMessage(from, "Bem, parece que você não se registrou... Então, se quiser usar meus comandos, terá que se registrar :) Envie /registrar", text)

                    if (args[0] == 'ajuda') return reply('Olá :)\nCom esse comando eu envio fotos de neko pra você.')
                    data = await fetchJson('https://waifu.pics/api/sfw/neko')
                    //if (!isRegister) return reply(mess.only.daftarB)
                    //if (isLimit(sender)) return reply(ind.limitend(pusname))
                    hasil = await getBuffer(data.url)
                    client.sendMessage(from, hasil, image, {
                        quoted: mek
                    })
                    //await limitAdd(sender)
                    break

                case 'anime':
                    if (!isUser) return client.sendMessage(from, "Bem, parece que você não se registrou... Então, se quiser usar meus comandos, terá que se registrar :) Envie /registrar", text)

                    if (args[0] == 'ajuda') return reply('Olá :)\nCom esse comando você pode obter imagens aleatórias de anime :)')
                    gatauda = body.slice(13)
                    reply(mess.wait)
                    //if (!isRegister) return reply(mess.only.daftarB)
                    //if (isLimit(sender)) return reply(ind.limitend(pusname))
                    anu = await fetchJson(`https://tobz-api.herokuapp.com/api/randomanime?apikey=BotWeA`, {
                        method: 'get'
                    })
                    buffer = await getBuffer(anu.result)
                    client.sendMessage(from, buffer, image, {
                        quoted: mek
                    })
                    //await limitAdd(sender)
                    break

                case 'play':
                    if (!isUser) return client.sendMessage(from, "Bem, parece que você não se registrou... Então, se quiser usar meus comandos, terá que se registrar :) Envie /registrar", text)

                    if (args[0] == 'ajuda') return reply('Olá :)\nEnvie esse comando seguido de um link do Youtube que irei baixar como música pra você :)')
                    // if (!isRegister) return reply(mess.only.daftarB)
                    // if (isLimit(sender)) return reply(ind.limitend(pusname))
                    reply(mess.wait)
                    play = body.slice(5)
                    anu = await fetchJson(`https://api.zeks.xyz/api/ytmp3/2?q=${play}&apikey=apivinz`)
                    if (anu.error) return reply(anu.error)
                    infomp3 = `*Música encontrada!!!*\nTítulo : ${anu.result.title}\nLink : ${anu.result.source}\nTamanho : ${anu.result.size}\n\n*Bem, é isso! Agora aguarde alguns minutos que irei enviar a música :)*`
                    buffer = await getBuffer(anu.result.thumbnail)
                    lagu = await getBuffer(anu.result.url_audio)
                    client.sendMessage(from, buffer, image, {
                        quoted: mek,
                        caption: infomp3
                    })
                    client.sendMessage(from, lagu, audio, {
                        mimetype: 'audio/mp4',
                        filename: `${anu.title}.mp3`,
                        quoted: mek
                    })
                    //await limitAdd(sender)
                    break

                case 'joox':
                    if (!isUser) return client.sendMessage(from, "Bem, parece que você não se registrou... Então, se quiser usar meus comandos, terá que se registrar :) Envie /registrar", text)

                    if (args[0] == 'ajuda') return reply('Olá :)\nCom esse comando eu consigo enviar músicas do app de streaming de músicas Joox (a maioria das músicas são asiáticas).')
                    tels = body.slice(6)
                    data = await fetchJson(`https://tobz-api.herokuapp.com/api/joox?q=${tels}&apikey=BotWeA`, {
                        method: 'get'
                    })
                    // if (!isRegister) return reply(mess.only.daftarB)
                    //if (isLimit(sender)) return reply(ind.limitend(pusname))
                    //if (data.error) return reply(data.error)
                    infomp3 = `*Música encontrada!!!*\nTítulo : ${data.result.judul}\nálbum : ${data.result.album}\nData da publicação : ${data.result.dipublikasi}`
                    buffer = await getBuffer(data.result.thumb)
                    lagu = await getBuffer(data.result.mp3)
                    client.sendMessage(from, buffer, image, {
                        quoted: mek,
                        caption: infomp3
                    })
                    client.sendMessage(from, lagu, audio, {
                        mimetype: 'audio/mp4',
                        filename: `${data.result.title}.mp3`,
                        quoted: mek
                    })
                    //await limitAdd(sender)
                    break

                case 'pinterest':
                    if (!isUser) return client.sendMessage(from, "Bem, parece que você não se registrou... Então, se quiser usar meus comandos, terá que se registrar :) Envie /registrar", text)

                    if (args[0] == 'ajuda') return reply('Olá :)\nCom esse comando eu envio imagens diretas do Pinterest para você! basta enviar o comando seguido do que deseja buscar.')
                    tels = body.slice(11)
                    //updatePresence(from, Presence.composing) 
                    data = await fetchJson(`https://api.fdci.se/rep.php?gambar=${tels}`, {
                        method: 'get'
                    })
                    // if (!isRegister) return reply(mess.only.daftarB)
                    // if (isLimit(sender)) return reply(ind.limitend(pusname))
                    reply(mess.wait)
                    n = JSON.parse(JSON.stringify(data));
                    nimek = n[Math.floor(Math.random() * n.length)];
                    pok = await getBuffer(nimek)
                    /*Troquei "nzwas por client*/
                    client.sendMessage(from, pok, image, {
                        quoted: mek,
                        caption: `*Espero ter encontrado o que você queria!*\n*Resultado da busca por* : *${tels}*`
                    })
                    //await limitAdd(sender)
                    break

                case 'ping':
                    if (!isUser) return client.sendMessage(from, "Bem, parece que você não se registrou... Então, se quiser usar meus comandos, terá que se registrar :) Envie /registrar", text)

                    if (args[0] == 'ajuda') return reply('Olá :)\nCom esse comando você pode ver minha velocidade.')

                    client.sendMessage(from, `Pong!\nMinha velocidade atual é de: ${latensi.toFixed(2)} segundos!`, text)
                    break
                /*********Comandos adicionados por Temon*********/
                case 'random':
                    client.sendMessage(from, random(prefix), text)
                    break
                case 'about':
                case 'sobre':
                    client.sendMessage(from, about(pushname), text)
                    break
                case 'rank':
                    //userLevel = getLevelingLevel(sender)
                    //userXp = getLevelingXp(sender)

                    if (!isUser) return client.sendMessage(from, "Bem, parece que você não se registrou... Então, se quiser usar meus comandos, terá que se registrar :) Envie /registrar", text)
                    client.sendMessage(from, rank(pushname, role, userXp, userLevel), text)
                    break

                case 'help':
                case 'menu':
                    if (!isUser) return client.sendMessage(from, "Bem, parece que você não se registrou... Então, se quiser usar meus comandos, terá que se registrar :) Envie /registrar", text)

                    if (!isUser) return reply(mess.only.userB)
                    client.sendMessage(from, help(prefix, pushname, user, latensi.toFixed(2), userXp, userLevel, role), text)
                    //break
                    //client.sendMessage(from, help(prefix, pushname), text)
                    break

                case 'info':
                    if (!isUser) return client.sendMessage(from, "Bem, parece que você não se registrou... Então, se quiser usar meus comandos, terá que se registrar :) Envie /registrar", text)

                    if (args[0] == 'ajuda') return reply('Olá :)\nCom esse comando você poderá ver informações sobre mim. Como o meu nome :)')
                    me = client.user
                    uptime = process.uptime()
                    teks = `*Meu nome*: ${me.name}\n*Minha tagname*: @${me.jid.split('@')[0]}\n*Meu prefixo*: ${prefix}\n*contatos bloqueados*: ${blocked.length}\n*Estou ativa há*: ${kyun(uptime)}`
                    buffer = await getBuffer(me.imgUrl)
                    client.sendMessage(from, buffer, image, {
                        caption: teks,
                        contextInfo: {
                            mentionedJid: [me.jid]
                        }
                    })
                    break

                case 'blocklist':
                    if (!isUser) return client.sendMessage(from, "Bem, parece que você não se registrou... Então, se quiser usar meus comandos, terá que se registrar :) Envie /registrar", text)

                    if (args[0] == 'ajuda') return reply('Olá :)\nEnvie isso para saber a lista de contatos bloqueados.')
                    teks = 'Lista de contatos bloqueados :\n'
                    for (let block of blocked) {
                        teks += `→ @${block.split('@')[0]}\n`
                    }
                    teks += `Total : ${blocked.length}`
                    client.sendMessage(from, teks.trim(), extendedText, {
                        quoted: mek,
                        contextInfo: {
                            "mentionedJid": blocked
                        }
                    })
                    break

                case 'ocr':
                    if (!isUser) return client.sendMessage(from, "Bem, parece que você não se registrou... Então, se quiser usar meus comandos, terá que se registrar :) Envie /registrar", text)

                    if (args[0] == 'ajuda') return reply('Olá :)\nEnvie uma foto com esse comando como legenda que irei retirar o texto da imagem pra você. Não entendeu? Faça um teste! :)')
                    if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
                        const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
                        const media = await client.downloadAndSaveMediaMessage(encmedia)
                        reply(mess.wait)
                        await recognize(media, {
                            lang: 'eng+ind',
                            oem: 1,
                            psm: 3
                        })
                            .then(teks => {
                                reply(teks.trim())
                                fs.unlinkSync(media)
                            })
                            .catch(err => {
                                reply(err.message)
                                fs.unlinkSync(media)
                            })
                    } else {
                        reply('Acho que você esqueceu de alguma coisa...')
                    }
                    break

                /*case 'tp':
                    if (args.length < 1) {
                        return reply('Pilih themenya om, 1 - 162')
                    } else if (args[0].toLowerCase() === 'list') {
                        teks = await fetchText('https://mhankbarbar.tech/api/textpro/listtheme')
                        teks = teks.replace(/<br>/g, '\n')
                        return reply(teks)
                    } else if (args.length < 2) {
                        return reply('Teksnya juga dong om')
                    }
                    reply(mess.wait)
                    anu = `https://mhankbarbar.tech/api/textpro?pack=${args[0]}&text=${body.slice(3+args[0].length+1)}&apiKey=${apiKey}`
                    voss = await fetch(anu)	
                    ftype = require('file-type')	
                    vuss = await ftype.fromStream(voss.body)
                    if (vuss !== undefined) {
                        client.sendMessage(from, await getBuffer(anu), image, { caption: mess.success, quoted: mek })
                    } else {
                        reply('Terjadi kesalahan, silahkan pilih theme lain')
                    }
                    break

                case 'ep':
                    if (args.length < 1) {
                        return reply('Pilih themenya om, 1 - 216')
                    } else if (args[0].toLowerCase() === 'list') {
                        teks = await fetchText('https://mhankbarbar.tech/api/ephoto/listtheme')
                        teks = teks.replace(/<br>/g, '\n')
                        return reply(teks)
                    } else if (args.length < 2) {
                        return reply('Teksnya juga dong om')
                    }
                    reply(mess.wait)
                    anu = `https://mhankbarbar.tech/api/ephoto?pack=${args[0]}&text=${body.slice(3+args[0].length+1)}&apiKey=${apiKey}`
                    voss = await fetch(anu)
                    ftype = require('file-type')
                    vuss = await ftype.fromStream(voss.body)
                    //console.log(vuss)
                    if (vuss !== undefined) {
                        client.sendMessage(from, await getBuffer(anu), image, { caption: mess.success, quoted: mek })
                    } else {
                        reply('Terjadi kesalahan, silahkan pilih theme lain')
                    }
                    break

                case 'tahta':
                    if (args.length < 1) return reply('Teksnya om')
                    anu = `https://mhankbarbar.tech/api/htahta?text=${args.join(' ')}&apiKey=${apiKey}`
                    voss = await fetch(anu)
                    ftype = require('file-type')
                    vuss = await ftype.fromStream(voss.body)
                    if (vuss !== undefined) {
                        client.sendMessage(from, await getBuffer(anu), image, { quoted: mek, caption: mess.sucess })
                    } else {
                        reply('Terjadi kesalahan')
                    }
                    break*/

                case 's':
                case 'sgif':
                case 'stickergif':
                case 'stiker':
                case 'sticker':
                    let stickerDados = args.join(" ")
                    if (stickerDados.length = 0) {
                        stickerDados = authorname
                    }
                    if (!isUser) return client.sendMessage(from, "Bem, parece que você não se registrou... Então, se quiser usar meus comandos, terá que se registrar :) Envie /registrar", text)
                    if ((isMedia && !mek.message.videoMessage || isQuotedImage) /*&& args.length == 0*/) {
                        const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
                        const media = await client.downloadAndSaveMediaMessage(encmedia)
                        ran = getRandom('.webp')
                        await ffmpeg(`./${media}`)
                            .input(media)
                            .on('start', function (cmd) {
                                console.log(`Started : ${cmd}`)
                            })
                            .on('error', function (err) {
                                console.log(`Error : ${err}`)
                                fs.unlinkSync(media)
                                reply(mess.error.stick)
                            })
                            .on('end', function () {
                                console.log('Finish')
                                exec(`webpmux -set exif ${addMetadata('Alice_Bot', `${stickerDados}`)} ${ran} -o ${ran}`, async (error) => {
                                    if (error) return reply(mess.error.stick)
                                    client.sendMessage(from, fs.readFileSync(ran), sticker, { quoted: mek })
                                    fs.unlinkSync(media)
                                    fs.unlinkSync(ran)
                                })
                                /*client.sendMessage(from, fs.readFileSync(ran), sticker, {quoted: mek})
                                fs.unlinkSync(media)
                                fs.unlinkSync(ran)*/
                            })
                            .addOutputOptions([`-vcodec`, `libwebp`, `-vf`, `scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
                            .toFormat('webp')
                            .save(ran)
                    } else if ((isMedia && mek.message.videoMessage.seconds < 11 || isQuotedVideo && mek.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.seconds < 11) && args.length == 0) {
                        const encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
                        const media = await client.downloadAndSaveMediaMessage(encmedia)
                        ran = getRandom('.webp')
                        reply(mess.wait)
                        await ffmpeg(`./${media}`)
                            .inputFormat(media.split('.')[1])
                            .on('start', function (cmd) {
                                console.log(`Started : ${cmd}`)
                            })
                            .on('error', function (err) {
                                console.log(`Error : ${err}`)
                                fs.unlinkSync(media)
                                tipe = media.endsWith('.mp4') ? 'video' : 'gif'
                                reply(`Desculpe, obtive falha ao conerter o ${type} em sticker`)
                            })
                            .on('end', function () {
                                console.log('Finish')
                                exec(`webpmux -set exif ${addMetadata('Alice_bot', authorname)} ${ran} -o ${ran}`, async (error) => {
                                    if (error) return reply(mess.error.stick)
                                    client.sendMessage(from, fs.readFileSync(ran), sticker, { quoted: mek })
                                    fs.unlinkSync(media)
                                    fs.unlinkSync(ran)
                                })
                                /*client.sendMessage(from, fs.readFileSync(ran), sticker, {quoted: mek})
                                fs.unlinkSync(media)
                                fs.unlinkSync(ran)*/
                            })
                            .addOutputOptions([`-vcodec`, `libwebp`, `-vf`, `scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
                            .toFormat('webp')
                            .save(ran)
                    } else if ((isMedia || isQuotedImage) && args[0] == 'nobg') {
                        const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
                        const media = await client.downloadAndSaveMediaMessage(encmedia)
                        ranw = getRandom('.webp')
                        ranp = getRandom('.png')
                        reply(mess.wait)
                        keyrmbg = 'Your-ApiKey'
                        await removeBackgroundFromImageFile({ path: media, apiKey: keyrmbg, size: 'auto', type: 'auto', ranp }).then(res => {
                            fs.unlinkSync(media)
                            let buffer = Buffer.from(res.base64img, 'base64')
                            fs.writeFileSync(ranp, buffer, (err) => {
                                if (err) return reply('Gagal, Terjadi kesalahan, silahkan coba beberapa saat lagi.')
                            })
                            exec(`ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${ranw}`, (err) => {
                                fs.unlinkSync(ranp)
                                if (err) return reply(mess.error.stick)
                                exec(`webpmux -set exif ${addMetadata('BOT', authorname)} ${ranw} -o ${ranw}`, async (error) => {
                                    if (error) return reply(mess.error.stick)
                                    client.sendMessage(from, fs.readFileSync(ranw), sticker, { quoted: mek })
                                    fs.unlinkSync(ranw)
                                })
                                //client.sendMessage(from, fs.readFileSync(ranw), sticker, {quoted: mek})
                            })
                        })
                        /*} else if ((isMedia || isQuotedImage) && colors.includes(args[0])) {
                            const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
                            const media = await client.downloadAndSaveMediaMessage(encmedia)
                            ran = getRandom('.webp')
                            await ffmpeg(`./${media}`)
                                .on('start', function (cmd) {
                                    console.log('Started :', cmd)
                                })
                                .on('error', function (err) {
                                    fs.unlinkSync(media)
                                    console.log('Error :', err)
                                })
                                .on('end', function () {
                                    console.log('Finish')
                                    fs.unlinkSync(media)
                                    client.sendMessage(from, fs.readFileSync(ran), sticker, {quoted: mek})
                                    fs.unlinkSync(ran)
                                })
                                .addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=${args[0]}@0.0, split [a][b]; [a] palettegen=reserve_transparent=off; [b][p] paletteuse`])
                                .toFormat('webp')
                                .save(ran)*/
                    } else {
                        reply(`Envie uma imagem com a legenda ${prefix}`)
                    }
                    break
                case 'tts':
                case 'gtts':
                    if (!isUser) return client.sendMessage(from, "Bem, parece que você não se registrou... Então, se quiser usar meus comandos, terá que se registrar :) Envie /registrar", text)

                    if (args[0] == 'ajuda') return reply('Olá :)\nEnvie esse comando seguido do código do idioma (ex: pt) que falarei ela pra você! :)')
                    if (args.length < 1) return client.sendMessage(from, 'Acho que você esqueceu o código do idioma... Envie /tts ajuda para saber mais', text, {
                        quoted: mek
                    })
                    const gtts = require('./lib/gtts')(args[0])
                    if (args.length < 2) return client.sendMessage(from, 'Texto muito pequeno, a quantidade de caracteres minima é 2', text, {
                        quoted: mek
                    })
                    dtt = body.slice(9)
                    ranm = getRandom('.mp3')
                    dtt.length > 600 ?
                        reply('Texto muito grande. A quantidade máxima de caracteres é de 600.') :
                        gtts.save(ranm, dtt, function () {
                            client.sendMessage(from, fs.readFileSync(ranm), audio, {
                                quoted: mek,
                                mimetype: 'audio/mp4',
                                ptt: true
                            })
                            fs.unlinkSync(ranm)
                        })
                    break

                case 'meme':
                    if (!isUser) return client.sendMessage(from, "Bem, parece que você não se registrou... Então, se quiser usar meus comandos, terá que se registrar :) Envie /registrar", text)

                    if (args[0] == 'ajuda') return reply('Olá :)\n')
                    meme = await fetchJson('https://kagchi-api.glitch.me/meme/memes', {
                        method: 'get'
                    })
                    buffer = await getBuffer(`https://imgur.com/${meme.hash}.jpg`)
                    client.sendMessage(from, buffer, image, {
                        quoted: mek,
                        caption: '.......'
                    })
                    break
                /*case 'memeindo':
                    memein = await kagApi.memeindo()
                    buffer = await getBuffer(`https://imgur.com/${memein.hash}.jpg`)
                    client.sendMessage(from, buffer, image, {quoted: mek, caption: '.......'})
                    break*/

                case 'setprefix':
                    if (!isUser) return client.sendMessage(from, "Bem, parece que você não se registrou... Então, se quiser usar meus comandos, terá que se registrar :) Envie /registrar", text)

                    if (args.length < 1) return
                    if (!isOwner) return reply(mess.only.ownerB)
                    prefix = args[0]
                    setting.prefix = prefix
                    fs.writeFileSync('./src/settings.json', JSON.stringify(setting, null, '\t'))
                    reply(`Prefix berhasil di ubah menjadi : ${prefix}`)
                    break

                /*case 'loli':
                    loli.getSFWLoli(async (err, res) => {
                        if (err) return reply('❌ *ERROR* ❌')
                        buffer = await getBuffer(res.url)
                        client.sendMessage(from, buffer, image, {quoted: mek, caption: 'Ingat! Citai Lolimu'})
                    })
                    break
                case 'nsfwloli':
                    if (!isNsfw) return reply('❌ *FALSE* ❌')
                    loli.getNSFWLoli(async (err, res) => {
                        if (err) return reply('❌ *ERROR* ❌')
                        buffer = await getBuffer(res.url)
                        client.sendMessage(from, buffer, image, {quoted: mek, caption: 'Jangan jadiin bahan buat comli om'})
                    })
                    break*/

                case 'hilih':
                    if (args.length < 1) return reply('Teksnya mana um?')
                    anu = await fetchJson(`https://mhankbarbars.herokuapp.com/api/hilih?teks=${body.slice(7)}`, {
                        method: 'get'
                    })
                    reply(anu.result)
                    break

                case 'yt2mp3':
                    if (!isUser) return client.sendMessage(from, "Bem, parece que você não se registrou... Então, se quiser usar meus comandos, terá que se registrar :) Envie /registrar", text)

                    if (args.length < 1) return reply('Urlnya mana um?')
                    if (!isUrl(args[0]) && !args[0].includes('youtu')) return reply(mess.error.Iv)
                    //anu = await fetchJson(`https://api.zeks.xyz/api/ytmp3/2?q=${args[0]}&apikey=apivinz`)
                    //anu = await fetchJson(`https://mhankbarbar.tech/api/yta?url=${args[0]}&apiKey=${apiKey}`, {method: 'get'})
                    anu = await fetchJson(`http://lolhuman.herokuapp.com/api/ytaudio?apikey=${lolapi}&url${args[0]}`)
                    if (anu.error) return reply(anu.error)
                    teks = `*Title* : ${anu.title}\n*Filesize* : ${anu.size}`
                    thumb = await getBuffer(anu.thumbnail)
                    client.sendMessage(from, thumb, image, {
                        quoted: mek,
                        caption: teks
                    })
                    buffer = await getBuffer(anu.result)
                    client.sendMessage(from, buffer, audio, {
                        mimetype: 'audio/mp4',
                        filename: `${anu.title}.mp3`,
                        quoted: mek
                    })
                    break

                case 'ytsearch':
                    if (!isUser) return client.sendMessage(from, "Bem, parece que você não se registrou... Então, se quiser usar meus comandos, terá que se registrar :) Envie /registrar", text)

                    if (args.length < 1) return reply('Yang mau di cari apaan? titit?')
                    anu = await fetchJson(`https://mhankbarbar.tech/api/ytsearch?q=${body.slice(10)}&apiKey=BarBarKey`, {
                        method: 'get'
                    })
                    if (anu.error) return reply(anu.error)
                    teks = '=================\n'
                    for (let i of anu.result) {
                        teks += `*Title* : ${i.title}\n*Id* : ${i.id}\n*Published* : ${i.publishTime}\n*Duration* : ${i.duration}\n*Views* : ${h2k(i.views)}\n=================\n`
                    }
                    reply(teks.trim())
                    break

                case 'tiktok':
                    if (!isUser) return client.sendMessage(from, "Bem, parece que você não se registrou... Então, se quiser usar meus comandos, terá que se registrar :) Envie /registrar", text)

                    if (args.length < 1) return reply('Urlnya mana um?')
                    if (!isUrl(args[0]) && !args[0].includes('tiktok.com')) return reply(mess.error.Iv)
                    reply(mess.wait)
                    anu = await fetchJson(`https://mhankbarbar.tech/api/tiktok?url=${args[0]}&apiKey=${apiKey}`, {
                        method: 'get'
                    })
                    if (anu.error) return reply(anu.error)
                    buffer = await getBuffer(anu.result)
                    client.sendMessage(from, buffer, video, {
                        quoted: mek
                    })
                    break

                case 'tiktokstalk':
                    if (!isUser) return client.sendMessage(from, "Bem, parece que você não se registrou... Então, se quiser usar meus comandos, terá que se registrar :) Envie /registrar", text)

                    if (args[0] == 'ajuda') return reply('Olá :)\nUse esse comando seguido do nome de usuário do tiktok que deseja stalkear 🤫')
                    try {
                        if (args.length < 1) return client.sendMessage(from, 'Acho que você esqueceu do nome de usuário...', text, {
                            quoted: mek
                        })
                        let {
                            user,
                            stats
                        } = await tiktod.getUserProfileInfo(args[0])
                        reply(mess.wait)
                        teks = `*ID* : ${user.id}\n*Username* : ${user.uniqueId}\n*Nickname* : ${user.nickname}\n*Seguidores* : ${stats.followerCount}\n*Seguindo* : ${stats.followingCount}\n*Posts* : ${stats.videoCount}\n*Luv* : ${stats.heart}\n`
                        buffer = await getBuffer(user.avatarLarger)
                        client.sendMessage(from, buffer, image, {
                            quoted: mek,
                            caption: teks
                        })
                    } catch (e) {
                        console.log(`Error :`, color(e, 'red'))
                        reply('Nome de usuário inválido')
                    }
                    break

                case 'nulis':
                case 'tulis':
                    if (!isUser) return client.sendMessage(from, "Bem, parece que você não se registrou... Então, se quiser usar meus comandos, terá que se registrar :) Envie /registrar", text)

                    if (args.length < 1) return reply('Yang mau di tulis apaan?')
                    teks = body.slice(7)
                    reply(mess.wait)
                    anu = await fetchJson(`https://mhankbarbar.tech/nulis?text=${teks}&apiKey=${apiKey}`, {
                        method: 'get'
                    })
                    if (anu.error) return reply(anu.error)
                    buff = await getBuffer(anu.result)
                    client.sendMessage(from, buff, image, {
                        quoted: mek,
                        caption: mess.success
                    })
                    break

                case 'url2img':
                    if (!isUser) return client.sendMessage(from, "Bem, parece que você não se registrou... Então, se quiser usar meus comandos, terá que se registrar :) Envie /registrar", text)

                    tipelist = ['desktop', 'tablet', 'mobile']
                    if (args.length < 1) return reply('Tipenya apa um?')
                    if (!tipelist.includes(args[0])) return reply('Tipe desktop|tablet|mobile')
                    if (args.length < 2) return reply('Urlnya mana um?')
                    if (!isUrl(args[1])) return reply(mess.error.Iv)
                    reply(mess.wait)
                    anu = await fetchJson(`https://mhankbarbar.tech/api/url2image?tipe=${args[0]}&url=${args[1]}&apiKey=${apiKey}`, {
                        method: 'get'
                    })
                    if (anu.error) return reply(anu.error)
                    buff = await getBuffer(anu.result)
                    client.sendMessage(from, buff, image, {
                        quoted: mek
                    })
                    break

                /*case 'tstiker':
                case 'tsticker':
                    if (args.length < 1) return reply('Textnya mana um?')
                    ranp = getRandom('.png')
                    rano = getRandom('.webp')
                    teks = body.slice(9).trim()
                    anu = await fetchJson(`https://mhankbarbar.tech/api/text2image?text=${teks}&apiKey=${apiKey}`, {method: 'get'})
                    if (anu.error) return reply(anu.error)
                    exec(`wget ${anu.result} -O ${ranp} && ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${rano}`, (err) => {
                        fs.unlinkSync(ranp)
                        if (err) return reply(mess.error.stick)
                        exec(`webpmux -set exif ${addMetadata('Alice Bot', authorname)} ${rano} -o ${rano}`, async (error) => {
                            if (error) return reply(mess.error.stick)
                            client.sendMessage(from, fs.readFileSync(rano), sticker, {quoted: mek})
                            fs.unlinkSync(rano)
                        })
                        /*client.sendMessage(from, fs.readFileSync(rano), sticker, {quoted: mek})
                        fs.unlinkSync(rano)
                    })
                    break*/

                case 'tagall':
                    if (!isUser) return client.sendMessage(from, "Bem, parece que você não se registrou... Então, se quiser usar meus comandos, terá que se registrar :) Envie /registrar", text)

                    if (args[0] == 'ajuda') return reply('Olá :)\nCom isso você pode chamar todos do grupo. Envie /tagall2 ou 3 para ver outras alternativas de chamar todo mundo :)')
                    if (!isGroup) return reply(mess.only.group)
                    if (!isGroupAdmins) return reply(mess.only.admin)
                    members_id = []
                    teks = (args.length > 1) ? body.slice(8).trim() : ''
                    teks += '\n\n'
                    for (let mem of groupMembers) {
                        teks += `*#* @${mem.jid.split('@')[0]}\n`
                        members_id.push(mem.jid)
                    }
                    mentions(teks, members_id, true)
                    break
                case 'comando':
                    mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
                    /* var textoBrabo = `gay ${mem.jid.split('@')[0]}`
                      var cacetada = {
                          text: textoBrabo,
                          contextInfo: {
                              mentionedJid: [mencionado]
                          },
                      }*/
                    mentions(`@${mentioned[0].split('@')[0]} gay`, mentioned, true)


                    break


                case 'tagall2':
                    if (!isUser) return client.sendMessage(from, "Bem, parece que você não se registrou... Então, se quiser usar meus comandos, terá que se registrar :) Envie /registrar", text)

                    members_id = []
                    teks = (args.length > 1) ? body.slice(8).trim() : ''
                    teks += '\n\n'
                    for (let mem of groupMembers) {
                        teks += `╠➥ @${mem.jid.split('@')[0]}\n`
                        members_id.push(mem.jid)
                    }
                    reply(teks)
                    break

                case 'tagall3':
                    if (!isUser) return client.sendMessage(from, "Bem, parece que você não se registrou... Então, se quiser usar meus comandos, terá que se registrar :) Envie /registrar", text)

                    members_id = []
                    teks = (args.length > 1) ? body.slice(8).trim() : ''
                    teks += '\n\n'
                    for (let mem of groupMembers) {
                        teks += `╠➥ https://wa.me/${mem.jid.split('@')[0]}\n`
                        members_id.push(mem.jid)
                    }
                    client.sendMessage(from, teks, text, {
                        detectLinks: false,
                        quoted: mek
                    })
                    break

                case 'clearall':
                    if (!isOwner) return reply('Esse comando só pode ser usado pelo carinha que cuida de mim.')
                    anu = await client.chats.all()
                    client.setMaxListeners(25)
                    for (let _ of anu) {
                        client.deleteChat(_.jid)
                    }
                    reply('Obtive sucesso ao deletar todos os chats :)')
                    break

                case 'bc':
                    if (!isUser) return client.sendMessage(from, "Bem, parece que você não se registrou... Então, se quiser usar meus comandos, terá que se registrar :) Envie /registrar", text)

                    if (!isOwner) return reply('Esse comando só pode ser usador pelo carinha que cuida de mim.')
                    if (args.length < 1) return reply('O que deseja transmitir?')
                    anu = await client.chats.all()
                    if (isMedia && !mek.message.videoMessage || isQuotedImage) {
                        const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
                        buff = await client.downloadMediaMessage(encmedia)
                        for (let _ of anu) {
                            client.sendMessage(_.jid, buff, image, {
                                caption: `Transmissão de Alice III\n\n${body.slice(4)}`
                            })
                        }
                        reply('Transmissão bem sucedida!')
                    } else {
                        for (let _ of anu) {
                            sendMess(_.jid, `Transmissão de Alice III\n\n${body.slice(4)}`)
                        }
                        reply('A transmissão foi bem sucedida')
                    }
                    break

                case 'promover':
                    if (!isUser) return client.sendMessage(from, "Bem, parece que você não se registrou... Então, se quiser usar meus comandos, terá que se registrar :) Envie /registrar", text)

                    if (args[0] == 'ajuda') return reply('Olá :)\nCaro Ademiro, use isso para promover um membro a adm! lembre-se de menciona-lo após o comando.')
                    if (!isGroup) return reply(mess.only.group)
                    if (!isGroupAdmins) return reply(mess.only.admin)
                    if (!isBotGroupAdmins) return reply(mess.only.Badmin)
                    if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return
                    mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
                    if (mentioned.length > 1) {
                        teks = 'Promovido com sucesso!\n'
                        for (let _ of mentioned) {
                            teks += `@${_.split('@')[0]}\n`
                        }
                        mentions(from, mentioned, true)
                        client.groupRemove(from, mentioned)
                    } else {
                        mentions(`@${mentioned[0].split('@')[0]} Promovido com sucesso a Ademiro `, mentioned, true)
                        client.groupMakeAdmin(from, mentioned)
                    }
                    break

                case 'rebaixar':
                    if (!isUser) return client.sendMessage(from, "Bem, parece que você não se registrou... Então, se quiser usar meus comandos, terá que se registrar :) Envie /registrar", text)

                    if (args[0] == 'ajuda') return reply('Olá :)\nCaro Ademiro, você pode usar esse comando para promover outros Ademiros a membros!')
                    if (!isGroup) return reply(mess.only.group)
                    if (!isGroupAdmins) return reply(mess.only.admin)
                    if (!isBotGroupAdmins) return reply(mess.only.Badmin)
                    if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return
                    mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
                    if (mentioned.length > 1) {
                        teks = 'Rebaixado com sucesso\n'
                        for (let _ of mentioned) {
                            teks += `@${_.split('@')[0]}\n`
                        }
                        mentions(teks, mentioned, true)
                        client.groupRemove(from, mentioned)
                    } else {
                        mentions(`@${mentioned[0].split('@')[0]} promovido a membro com sucesso!!`, mentioned, true)
                        client.groupDemoteAdmin(from, mentioned)
                    }
                    break

                case 'adicionar':
                    if (!isUser) return client.sendMessage(from, "Bem, parece que você não se registrou... Então, se quiser usar meus comandos, terá que se registrar :) Envie /registrar", text)

                    if (args[0] == 'ajuda') return reply('Olá :)\nCaro Ademiro, você pode usar esse comando para adicionar novos membros ao grupo')
                    if (!isGroup) return reply(mess.only.group)
                    if (!isGroupAdmins) return reply(mess.only.admin)
                    if (!isBotGroupAdmins) return reply(mess.only.Badmin)
                    if (args.length < 1) return reply('Quem você quer adicionar Ademiro?')
                    if (args[0].startsWith('08')) return reply('Use o código do país.')
                    try {
                        num = `${args[0].replace(/ /g, '')}@s.whatsapp.net`
                        client.groupAdd(from, [num])
                    } catch (e) {
                        console.log('Error :', e)
                        reply('Falha ao adicionar o número. Talvez seja privado. Envie /linkgrupo para receber o link do grupo e enviar para o contato :)')
                    }
                    break
                case 'remover':
                    if (!isUser) return client.sendMessage(from, "Bem, parece que você não se registrou... Então, se quiser usar meus comandos, terá que se registrar :) Envie /registrar", text)

                    if (args[0] == 'ajuda') return reply('Olá :)\nCaro Ademiro, você pode usar esse comando para remover aqueles membros chatos. Use com sabedoria :)')
                    if (!isGroup) return reply(mess.only.group)
                    if (!isGroupAdmins) return reply(mess.only.admin)
                    if (!isBotGroupAdmins) return reply(mess.only.Badmin)
                    if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('Marque quem você deseja remover, caro Ademiro!')
                    mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
                    if (mentioned.length == 1) {
                        teks = 'Ok... Removendo membro :\n'
                        for (let _ of mentioned) {
                            teks += `@${_.split('@')[0]}\n`
                        }
                        mentions(teks, mentioned, true)
                        client.groupRemove(from, mentioned)
                    } else {
                        mentions(`Ok, membro removido: @${mentioned[0].split('@')[0]}`, mentioned, true)
                        client.groupRemove(from, mentioned)
                    }
                    break

                case 'admins':
                    if (!isUser) return client.sendMessage(from, "Bem, parece que você não se registrou... Então, se quiser usar meus comandos, terá que se registrar :) Envie /registrar", text)

                    if (args[0] == 'ajuda') return reply('Olá :)\nUse esse comando para listar todos os adms do grupo.')
                    if (!isGroup) return reply(mess.only.group)
                    teks = `*Lista de ademiros do grupo* *${groupMetadata.subject}*\nTotal : ${groupAdmins.length}\n\n`
                    no = 0
                    for (let admon of groupAdmins) {
                        no += 1
                        teks += `[${no.toString()}] @${admon.split('@')[0]}\n`
                    }
                    mentions(teks, groupAdmins, true)
                    break
                case 'linkgrupo':
                case 'linkgroup':
                    if (!isUser) return client.sendMessage(from, "Bem, parece que você não se registrou... Então, se quiser usar meus comandos, terá que se registrar :) Envie /registrar", text)

                    if (args[0] == 'ajuda') return reply('Olá :)\nUse esse comando para obter o link do grupo :)')
                    if (!isGroup) return reply(mess.only.group)
                    if (!isGroupAdmins) return reply(mess.only.admin)
                    if (!isBotGroupAdmins) return reply(mess.only.Badmin)
                    linkgc = await client.groupInviteCode(from)
                    reply('https://chat.whatsapp.com/' + linkgc)
                    break

                case 'sair':
                    if (!isUser) return client.sendMessage(from, "Bem, parece que você não se registrou... Então, se quiser usar meus comandos, terá que se registrar :) Envie /registrar", text)

                    if (!isGroup) return reply(mess.only.group)
                    if (isGroupAdmins || isOwner) {
                        client.groupLeave(from)
                    } else {
                        reply(mess.only.admin)
                    }
                    break

                case 'toimg':
                    if (!isUser) return client.sendMessage(from, "Bem, parece que você não se registrou... Então, se quiser usar meus comandos, terá que se registrar :) Envie /registrar", text)

                    if (args[0] == 'ajuda') return reply('Olá :)\nEnvie esse comando que eu transformo uma figurinha em imagem pra você :)')
                    if (!isQuotedSticker) return reply('Acho qur você esqueceu de algo... Tente responder uma figurinha com esse comando.')
                    reply(mess.wait)
                    encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
                    media = await client.downloadAndSaveMediaMessage(encmedia)
                    ran = getRandom('.png')
                    exec(`ffmpeg -i ${media} ${ran}`, (err) => {
                        fs.unlinkSync(media)
                        if (err) return reply('Ocorreu um erro ao converter a figurinha em uma imagem :(')
                        buffer = fs.readFileSync(ran)
                        client.sendMessage(from, buffer, image, {
                            quoted: mek,
                            caption: '>//<'
                        })
                        fs.unlinkSync(ran)
                    })
                    break

                case 'simi':
                    if (!isUser) return client.sendMessage(from, "Bem, parece que você não se registrou... Então, se quiser usar meus comandos, terá que se registrar :) Envie /registrar", text)

                    if (args.length < 1) return reply('Textnya mana um?')
                    teks = body.slice(5)
                    //anu = await simih(teks)fetchJson(`https://mhankbarbars.herokuapp.com/api/samisami?text=${teks}`, {method: 'get'})
                    const simih = fetchJson(`https://simsumi.herokuapp.com/api?text=${teks}`, {
                        method: 'GET'
                    })
                    anu = await simih(teks)
                    if (anu.error) return reply('Simi ga tau kak')
                    reply(anu)
                    break

                case 'simih':
                    if (!isUser) return client.sendMessage(from, "Bem, parece que você não se registrou... Então, se quiser usar meus comandos, terá que se registrar :) Envie /registrar", text)

                    if (!isGroup) return reply(mess.only.group)
                    if (!isGroupAdmins) return reply(mess.only.admin)
                    if (args.length < 1) return reply('Hmmmm')
                    if (Number(args[0]) === 1) {
                        if (isSimi) return reply('Mode simi sudah aktif')
                        samih.push(from)
                        fs.writeFileSync('./src/simi.json', JSON.stringify(samih))
                        reply('Sukses mengaktifkan mode simi di group ini ✔️')
                    } else if (Number(args[0]) === 0) {
                        samih.splice(from, 1)
                        fs.writeFileSync('./src/simi.json', JSON.stringify(samih))
                        reply('Sukes menonaktifkan mode simi di group ini ✔️')
                    } else {
                        reply('1 untuk mengaktifkan, 0 untuk menonaktifkan')
                    }
                    break

                case 'welcome':
                    if (!isUser) return client.sendMessage(from, "Bem, parece que você não se registrou... Então, se quiser usar meus comandos, terá que se registrar :) Envie /registrar", text)

                    if (args[0] == 'ajuda') return reply('Olá :)\nCaro Ademiro, use esse comando se se quiser que eu dê boas vindas aos novos membros que entrarem no grupo :)')
                    if (!isGroup) return reply(mess.only.group)
                    if (!isGroupAdmins) return reply(mess.only.admin)
                    if (args.length < 1) return reply('Envie esse comando seguido de 1 ou 0.')
                    if (Number(args[0]) === 1) {
                        if (isWelkom) return reply('O recurso de bem vindo já está ativo.')
                        welkom.push(from)
                        fs.writeFileSync('./src/welkom.json', JSON.stringify(welkom))
                        reply('Sucesso! Agorda darei boas vindas aos novos membros que entrarem no grupo! :)')
                    } else if (Number(args[0]) === 0) {
                        welkom.splice(from, 1)
                        fs.writeFileSync('./src/welkom.json', JSON.stringify(welkom))
                        reply('Sucesso! Agora darei boas vindas aos novos membros que entrarem no grupo! :)')
                    } else {
                        reply('Envie esse comando seguido de 1 para ativar ou 0 para desativar o recurso de boas vindas.')
                    }
                    break

                case 'clone':
                    if (!isUser) return client.sendMessage(from, "Bem, parece que você não se registrou... Então, se quiser usar meus comandos, terá que se registrar :) Envie /registrar", text)

                    if (!isGroup) return reply(mess.only.group)
                    if (!isGroupAdmins) return reply(mess.only.admin)
                    if (args.length < 1) return reply('Selecione o alvo')
                    if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('Tag cvk')
                    mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid[0]
                    let {
                        jid, id, notify
                    } = groupMembers.find(x => x.jid === mentioned)
                    try {
                        pp = await client.getProfilePicture(id)
                        buffer = await getBuffer(pp)
                        client.updateProfilePicture(botNumber, buffer)
                        mentions(`Foto de perfil clonada de : @${id.split('@')[0]}`, [jid], true)
                    } catch (e) {
                        reply('Puts, falhei :(')
                    }
                    break

                case 'wait':
                    if (!isUser) return client.sendMessage(from, "Bem, parece que você não se registrou... Então, se quiser usar meus comandos, terá que se registrar :) Envie /registrar", text)

                    if (args[0] == 'ajuda') return reply('Olá :)\nUse esse comando para procurar aquele anime que você não sabe o nome apenas pela foto!! (Não é tão preciso, mas dou o meu melhor)')
                    if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
                        reply(mess.wait)
                        const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
                        media = await client.downloadMediaMessage(encmedia)
                        await wait(media).then(res => {
                            client.sendMessage(from, res.video, video, {
                                quoted: mek,
                                caption: res.teks.trim()
                            })
                        }).catch(err => {
                            reply(err)
                        })
                    } else {
                        reply('Acho que você esqueceu de algo...')
                    }
                    break

                default:
                    if (isCmd) {
                        reply(`Olá :)\nEsse comando não consta no meu banco de dados.\nEnvie ${prefix}menu para ver os meus comandos :)`)
                    }
                    if (isGroup && isSimi && budy != undefined) {
                        console.log(budy)
                        muehe = await simih(budy)
                        console.log(muehe)
                        reply(muehe)
                    } else {
                        return console.log(color('[Atenção]', 'red'), 'Comando não registrado por:', color(sender.split('@')[0]))
                    }
            }
        } catch (e) {
            console.log('Error : %s', color(e, 'red'))
        }
    })
}
starts()