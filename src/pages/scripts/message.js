;(async function () {
  const channelId = document.getElementById('channelId')
  const name = document.getElementById('name')
  const text = document.getElementById('message')
  const time = document.getElementById('time')
  const btn = document.getElementById('btn-add')

  const id = new URLSearchParams(window.location.search).get('id')

  if (id) {
    const message = await window.storages.message(id)
    channelId.value = message.channelId
    name.value = message.name
    time.value = message.schedule
    text.value = message.text

    btn.innerText = 'Edit'
  }

  btn.addEventListener('click', () => {
    const data = {
      name: name.value,
      text: text.value,
      channelId: channelId.value,
      schedule: time.value,
    }

    if (id) {
      window.storages.editMessage({ ...data, id })
      return (window.location.href = 'index.html')
    }

    window.storages.createMessage(data)

    window.location.href = 'index.html'
  })
})()
