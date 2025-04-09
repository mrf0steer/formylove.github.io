document.addEventListener('DOMContentLoaded', () => {
	const catContainer = document.querySelector('.cat-container')
	const letters = [
		{
			element: document.getElementById('letter-text1'),
			container: document.getElementById('letter1'),
			text: `
            		Любимая, я долго думал о нас — о том, что было, что я делал и где облажался. Я знаю, что разочаровал тебя, и понимаю, как сильно ты ждёшь от меня другого — тепла, уверенности, заботы. Не буду грузить тебя своими оправданиями, скажу прямо: ты мечтаешь быть рядом с мужчиной, на которого можно опереться, а я пока не был таким, хотя ты этого заслуживаешь больше всех. Я вижу свои ошибки — мы говорили об этом, но я всё равно подводил тебя, и мне от этого паршиво. Ты могла чувствовать себя просто "удобной", хотя для меня ты — самое дорогое, что есть. Ты хочешь быть моей хрупкой, нежной девочкой, а я мечтаю окружить тебя заботой, видеть твою улыбку каждый день и делать тебя счастливой. Хочу, чтобы все самые яркие моменты жизни были с тобой, моя хорошая! Я ПИЗДЕЦ КАК СИЛЬНО ТЕБЯ ЛЮБЛЮ, что слов не хватает, но мои поступки пока этого не показывали, и я ненавижу себя за это.
	    		`.trim(),
			speed: 50,
			nextLetter: document.getElementById('letter2'),
		},
		{
			element: document.getElementById('letter-text2'),
			container: document.getElementById('letter2'),
			text: `
            		Я вижу только один выход, мой котик: я изменюсь. Не просто для тебя, а для нас, для себя, для всех, кто мне дорог. Это не пустые слова — я настроен доказать, что могу быть тем, кем ты гордишься. Мне нужно немного времени и твоя вера в меня, любимая. Думаю, 4 месяца хватит, чтобы встать на ноги и показать тебе, что я серьёзно — или хотя бы быть на пути к этому. Ты можешь спросить: "Зачем мне ждать?" А я отвечу: потому что ты — мой мир, и я не хочу тебя терять. Знаю, как тебе больно, когда веду себя так или обещаю зря, и мне больно от этого вдвойне. Прошу тебя, дай мне шанс всё исправить. Если за эти месяцы ничего не изменится, я пойму, что подвёл нас обоих, и нам, к сожалению, придётся разойтись. Но я сделаю всё, чтобы наша жизнь стала такой, как ты мечтаешь, — полной тепла и любви.
	    		`.trim(),
			speed: 50,
			nextLetter: document.getElementById('letter3'),
		},
		{
			element: document.getElementById('letter-text3'),
			container: document.getElementById('letter3'),
			text: `
             		Мог бы сказать это по телефону или глядя в твои красивые глаза, когда вручал букет, но захотел сделать что-то особенное, чтобы ты улыбнулась. Знаю, ты оценишь такие, и мне важно, чтобы ты почувствовала, как сильно ты мне нужна. Люблю тебя бесконечно, мой котик! 🩷🩷🩷
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
