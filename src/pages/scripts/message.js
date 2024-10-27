;(function () {
  const channelId = document.getElementById('channelId')
  const name = document.getElementById('name')
  const message = document.getElementById('message')
  const time = document.getElementById('time')
  const btn = document.getElementById('btn-add')

  btn.addEventListener('click', () => {
    window.storages.createMessage({
      name: name.value,
      text: message.value,
      channelId: channelId.value,
      schedule: time.value,
    })

    window.location.href = 'index.html'
  })
})()
