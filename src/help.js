const help = (prefix, pushname, user, latensi, userXp, userLevel, role) => {
	return `Olá, *@${pushname}*  :)
| ◪ Sua patente:  ${role}
| ◪ Seu Xp: ${userXp}
| ◪ Seu Level: ${userLevel}

Eu me chamo *Alice* ;)
Levei exatamente *${latensi} segundos* para te responder!

> *❏ Menu principal* <
_Aqui estão todos os meus comandos e seus submenus_

> *❏ STICKERS* <
_Comandos usados para fazer figurinhas_
| ◪ *${prefix}s*
| ◪ *${prefix}toimg*

> *❏ GRUPO* <
_Comandos usados somente em grupos_
| ◪ *${prefix}adicionar* [número]
| ◪ *${prefix}remover* [tagname]
| ◪ *${prefix}promover* [tagname]
| ◪ *${prefix}rebaixar* [tagname]
| ◪ *${prefix}linkgrupo* 
| ◪ *${prefix}sair*
| ◪ *${prefix}tagall* 
| ◪ *${prefix}admins*

> *❏ ANIMES* <
_Comandos dos otakus_
| ◪ *${prefix}loli*
| ◪ *${prefix}wait*
| ◪ *${prefix}anime*
| ◪ *${prefix}nekonime*
| ◪ *${prefix}nekos_life*

> *❏ UTILITÁRIOS* < 
_Comandos que servem de utilitários_
| ◪ *${prefix}tts* [cc] (texto)
| ◪ *${prefix}url2img* 
| ◪ *${prefix}wame*
| ◪ *${prefix}wattpad [O que quer procurar]*
| ◪ *${prefix}grave*
| ◪ *${prefix}estourado*
| ◪ *${prefix}brainly [pergunta]* 
| ◪ *${prefix}scep [CEP]* 
| ◪ *${prefix}placa [Placa]*
| ◪ *${prefix}clima [cidade (sem acentos)]*

> *❏ DOWNLOAD* <
_Comandos para baixar coisas da internet_
| ◪ *${prefix}pinterest [Termo]*
| ◪ *${prefix}joox [Artista - Música]*
| ◪ *${prefix}ytplay [link ou título/palavra-chave]*
| ◪ *${prefix}ytmp4 [link ou Título/palavras-chave]*
| ◪ *${prefix}igdl [link]*
| ◪ *${prefix}fbdl [link]*
| ◪ *${prefix}spotifysearch [artista - Música]*
| ◪ *${prefix}spotify [link]*

> *❏ OUTROS* <
_Outros comandos_
| ◪ *${prefix}tiktokstalk* [tagname]
| ◪ *${prefix}setprefix* 
| ◪ *${prefix}ping*
| ◪ *${prefix}rank*
| ◪ *${prefix}random*
| ◪ *${prefix}about*
Considere ver o comando a cima para saber sobre mim :)
_Mais em breve..._

_Envie "ajuda" depois do comando para ver sua utilidade._
Ex: /anime ajuda

Quantidade de usuários: ${user.length}
Feito com 🖤 por *Temoonlyn*`}

exports.help = help

const rank = (pushname, role, userXp, userLevel) => {
  return `◪ *${pushname}*
├❑ Patente:  ${role}
├❑ XP do usuário: ${userXp}
└❑ Nivel: ${userLevel}

◪ *Níveis*   
├❑  Level 5: Júnior
├❑  Level 6: bronze I
├❑  Level 7: Bronze II
├❑  Level 8: Bronze III
├❑  Level 9: Prata I
├❑  Level 10: Prata II
├❑  Level 11: Prata III
├❑  Level 12: Ouro I
├❑  Level 13: Ouro II
├❑  Level 14: Ouro III
├❑  Level 15: Diamante I
├❑  Level 16: Diamante II
├❑  Level 17: Diamante III
├❑  Level 18: Diamante IV
├❑  Level 19: Diamante V
├❑  Level 20: Diamante Mestre
├❑  Level 21: Elite
├❑  Level 22: Lendário
├❑  Level 23: Semi-Deus
├❑  Level 24: Deus
├❑  Level 25: Quase dono do bot
├❑  Level 35: Não vai ser dono 👍
└❑  Level 50: patente alta demais, não tem nome`}

exports.rank = rank

const about = (pushname) => {
  return `Olá, ${pushname} :)
Bem, não sei se você me conhece... Mas eu me chamo Alice :)
Sou fruto de muitos testes do meu criador (Temon), onde o mesmo ainda aprende, assim como eu :)

Uso como base o bot feito por MhankBarBar, ele é o meu coração, porém, com algumas alterações do Temon. Como outros comandos e outros sistemas (sistema de cadastro e níveis)

Porém, gostaria de agradecer à:
MhankBarBar (pela base)
LolHuman (por boa parte das apis usadas)
Nzwas e Fxc7 (por alguns sistemas)
E todo mundo que ajudou a tornar isso possível :)

Caso queira falar com meu dono, envie um oi para:
Temon https://wa.me/558695326030

Ou caso queira me pagar um café... Esse é meu picpay: @murilo.temon
`}
exports.about = about

const random = (prefix) => {
  return `Alguns comandos de imagens e gifs aleatórios:
  
${prefix}art
${prefix}bts
${prefix}exo
${prefix}elf
${prefix}loli
${prefix}neko
${prefix}waifu
${prefix}shota
${prefix}husbu
${prefix}sagiri
${prefix}shinobu
${prefix}megumin
${prefix}wallnime
${prefix}hiisaihentai
${prefix}trap
${prefix}blowjob
${prefix}yaoi
${prefix}ehi
${prefix}hentai
${prefix}ahegao
${prefix}hololewd
${prefix}sideoppai
${prefix}animefeets
${prefix}animebooty
${prefix}animethighss
${prefix}hentaiparadise
${prefix}animearmpits
${prefix}hentaifemdom
${prefix}lewdanimegirls
${prefix}biganimetiddies
${prefix}hentai4everyone
${prefix}bj
${prefix}ero
${prefix}um
${prefix}feet
${prefix}yuri
${prefix}trap
${prefix}lewd
${prefix}feed
${prefix}eron
${prefix}solo
${prefix}gasm
${prefix}poke
${prefix}anal
${prefix}holo
${prefix}tits
${prefix}kuni
${prefix}kiss
${prefix}erok
${prefix}smug
${prefix}baka
${prefix}solog
${prefix}feetg
${prefix}lewdk
${prefix}waifu
${prefix}pussy
${prefix}femdom
${prefix}uddle
${prefix}hentai
${prefix}eroyuri
${prefix}um_jpg
${prefix}blowjob
${prefix}erofeet
${prefix}holoero
${prefix}lassi
${prefix}erokemo
${prefix}fox_girl
${prefix}futanari
${prefix}lewdkemo
${prefix}wallpaper
${prefix}pussy_jpg
${prefix}kemonomimi
${prefix}nsfw_avatar
${prefix}ngif
${prefix}nsfw_neko_gif
${prefix}animebellybutton
${prefix}random_hentai_gif

*Use como parâmetros pro comando ${prefix}nekos_life*
Random_hentai_gif
meow
erok
lizard
feetg
baka
v3
bj
erokemo
tickle
feetneko
kuni
femdom
futanari
smallboobs
goose
poke
les
trap
pat
boobs
blowjob
hentai
hololewd
ngif
fox_girl
wallpaper
lewdk
solog
pussy
yuri
lewdkemo
lewd
anal
pwankg
nsfw_avatar
eron
kiss
pussy_jpg
woof
hug
keta
cuddle
eroyuri
slap
cum_jpg
waifu
gecg
tits
avatar
holoero
classic
kemonomimi
feet
gasm
spank
erofeet
ero
solo
cum
smug
holo

Sim, não há descrição pois tenho preguiça de descrever cada um.
E sim também, não está do menor para o maior justamente pra atacar deu TOC huehuehuehue
Use os comandos com sabedoria.`}

exports.random = random
/*
* ONLY*
* .antidelete [ enable | disable ]*
*| ◪ .afk [ reason ]*

*❏ DOWNLOADER*
*| ◪ .ytplayvid [ query ]*
*| ◪ .tiktok [ link ]*
*| ◪ .soundcloud [ link ]*

*❏ EDUCATION*
*| ◪ .nulis [ teks ]*
*| ◪ .cerpen*
*| ◪ .puisi*

*❏ MEDIA* 
*| ◪ .ytsearch [ query ]*
*| ◪ .tiktokhastag [ query ]*
*| ◪ .tribunnews*

*❏ TEXTMAKER*
*| ◪ .carbon [ teks ]*
*| ◪ .quotemaker [ teks ]*
*| ◪ .Harta [ teks ]*

*❏ OTHER*
*| ◪ .sticker*
*| ◪ .sgif*

*Made with by 🖤 𝙀𝙡𝙞𝙤𝙨*
`
*/