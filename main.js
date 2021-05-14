(() => {
	function appendButton() {
		document.querySelectorAll('#playlist').forEach(elem => {
			if (!elem.querySelector('.youtube-links-export__button')) {
				const button = document.createElement('button')
				button.style = 'padding: 10px; background: none; border: 0; text-transform: uppercase; font-size: 14px; font-weight: 500; color: rgb(96,96,96); cursor: pointer; line-height: 16px; font-family: Roboto, Arial, sans-serif;'
				button.textContent = 'Export'
				const div = document.createElement('div')
				div.className = 'youtube-links-export__button'
				div.append(button)
				elem.querySelector('#end-actions').prepend(div)
				button.addEventListener('click', e => {
					e.preventDefault()
					e.stopPropagation()
					const links = [...new Set([...document.querySelectorAll('#playlist a.ytd-playlist-panel-video-renderer')].map(a => a.href.replace(/^.*v=([^&]*).*$/, '$1')))].map(str => `https://www.youtube.com/watch?v=${str}`)
					navigator.clipboard.writeText(links.join('\r\n')).then(function () {
						alert(`Copied ${links.length} links to clipboard`)
					}, function (err) {
						alert(`Error copying to clipboard`)
						console.error('[youtube-links-export] Error copying to clipboard', { links, err })
					})
				})
			}
		})
	}
	
	(new MutationObserver(() => {
		appendButton()
	})).observe(document, {
		childList: true,
		subtree: true,
	})
	appendButton()
})()
