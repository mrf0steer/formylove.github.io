document.addEventListener('DOMContentLoaded', () => {
	const catContainer = document.querySelector('.cat-container')
	const letters = [
		{
			element: document.getElementById('letter-text1'),
			container: document.getElementById('letter1'),
			text: `
            Я долго думал обо всём — о нас, о том, что я делал, а что нет. Понимаю, что разочаровал тебя, и знаю, что ты ждёшь от отношений другого. Не буду ныть про свои проблемы, скажу как есть: ты хочешь видеть рядом уверенного мужчину, а я пока не тот, кого ты хочешь видеть рядом с собой. Сам вижу свои косяки, и мы не раз это обсуждали, но я всё равно тебя подводил. Знаю, что давал пустые обещания, и тебе могло казаться, что ты просто «удобная». А ты ведь хочешь быть просто хрупкой девочкой рядом со мной — а я хочу в свою очередь дать тебе заботу, милая, дарить улыбки, делать счастливой. Я ПИЗДЕЦ КАК ТЕБЯ ЛЮБЛЮ!!! Но мои действия пока говорят обратное.
            `.trim(),
			speed: 50,
			nextLetter: document.getElementById('letter2'),
		},
		{
			element: document.getElementById('letter-text2'),
			container: document.getElementById('letter2'),
			text: `
            Вижу только один выход в этой ситуации - Я изменюсь. Для себя, для тебя, для своих близких. Это не просто слова — я серьёзно настроен доказать, что чего-то стою. Мне нужно время и твоя вера в меня. Думаю, 4 месяца хватит, чтобы встать на ноги и показать тебе результат — или хотя бы быть близко к этому. Ты можешь спросить: «Зачем мне это?» А я отвечу: потому что ты мне дорога, и я не хочу тебя терять. Знаю, что тебе больно от моего поведения, но я прошу дать мне шанс всё исправить. Если за это время ничего не изменится, то к сожалению нам придется разойтись. Подумай об этом спокойно, не тороплю с ответом. Ты очень важна для меня.
            `.trim(),
			speed: 50,
			nextLetter: document.getElementById('letter3'),
		},
		{
			element: document.getElementById('letter-text3'),
			container: document.getElementById('letter3'),
			text: `
             Мог сказать это лично или в звонке с тобой когда отдал букет и открытку, но решил креативно подойти к тому что хочу сказать. Я знаю ты оценишь это =) 
            `.trim(),
			speed: 50,
		},
	]

	let currentLetter = 0
	let isTyping = false

	function unlockNextLetter(nextLetterContainer) {
		if (nextLetterContainer) {
			nextLetterContainer.classList.remove('locked')
			const prompt = nextLetterContainer.querySelector('.click-prompt')
			prompt.classList.remove('hidden')
			const lockIcon = nextLetterContainer.querySelector('.lock-icon')
			if (lockIcon) lockIcon.remove()
		}
	}

	function typeWriter(letterObj, callback) {
		isTyping = true
		letterObj.container.classList.add('expanded')
		const prompt = letterObj.container.querySelector('.click-prompt')
		if (prompt) prompt.remove()

		let i = 0
		letterObj.element.classList.remove('hidden')
		letterObj.element.classList.add('visible')
		letterObj.element.textContent = ''

		const typingInterval = setInterval(() => {
			if (i < letterObj.text.length) {
				letterObj.element.textContent = letterObj.text.substring(0, i + 1)
				i++
				window.scrollTo(0, document.body.scrollHeight)
			} else {
				clearInterval(typingInterval)
				letterObj.container.setAttribute('data-completed', 'true')
				isTyping = false

				unlockNextLetter(letterObj.nextLetter)

				if (!letterObj.nextLetter) {
					setTimeout(() => {
						catContainer.classList.add('visible')
					}, 500)
				}

				if (callback) callback()
			}
		}, letterObj.speed)
	}

	function handleClick(letterIndex) {
		if (
			letterIndex !== currentLetter ||
			isTyping ||
			letters[letterIndex].container.classList.contains('locked')
		)
			return

		const letter = letters[letterIndex]
		typeWriter(letter, () => {
			currentLetter++
		})
	}

	letters.forEach((letter, index) => {
		letter.container.addEventListener('click', () => handleClick(index))
	})
})
