document.getElementById('loginForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();
  const fileInput = document.getElementById('idFile');
  const status = document.getElementById('status');

  if (fileInput.files.length === 0) {
    status.textContent = 'Please upload ID.txt';
    return;
  }

  const file = fileInput.files[0];
  const reader = new FileReader();

  reader.onload = function (e) {
    const lines = e.target.result.split('\n');
    let matched = false;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line.startsWith('1.User=')) {
        const user = line.split('=')[1];
        const passLine = lines[i + 1]?.trim();
        if (passLine && passLine.startsWith('Password=')) {
          const pass = passLine.split('=')[1];
          if (user === username && pass === password) {
            matched = true;
            break;
          }
        }
      }
    }

    status.textContent = matched
      ? '✅ Login success'
      : '❌ Incorrect username or password';
    status.style.color = matched ? '#6fff9b' : '#ff7070';
  };

  reader.readAsText(file);
});
