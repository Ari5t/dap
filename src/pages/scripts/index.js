// <li>
//   <p class="title">Message</p>
//   <div class="home__buttons-group">
//     <a class="button button-edit">Edit</a>
//     <a class="button button-delete">Delete</a>
//   </div>
// </li>

;(async function () {
  const messageList = document.getElementById('message-list')
  const messages = await window.storages.messages()

  messages.forEach((element) => {
    const message = document.createElement('li')

    const messageTitle = document.createElement('p')
    messageTitle.classList.add('title')
    messageTitle.innerText = element.name

    const actionButtons = document.createElement('div')
    actionButtons.classList.add('home__buttons-group')

    const editButton = document.createElement('a')
    editButton.classList.add('button', 'button-edit')
    editButton.innerText = 'Edit'

    const deleteButton = document.createElement('a')
    deleteButton.classList.add('button', 'button-delete')
    deleteButton.innerText = 'Delete'

    deleteButton.addEventListener('click', () => {
      window.storages.removeMessage(element.id)
      window.location.reload()
    })

    actionButtons.appendChild(editButton)
    actionButtons.appendChild(deleteButton)

    message.appendChild(messageTitle)
    message.appendChild(actionButtons)

    messageList.appendChild(message)
  })
})()
