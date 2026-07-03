const ids = ['-UOXPswALy4', 'jeWq8yW2Wz8', 'O-8F6yA4H1o', 'TTh3yA5-x68'];

async function checkEmbed() {
  for (const id of ids) {
    const url = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${id}&format=json`;
    try {
      const res = await fetch(url);
      if (res.status === 200) {
        const data = await res.json();
        console.log(`ID: ${id} | Title: ${data.title} | Embeddable: Yes`);
      } else {
        console.log(`ID: ${id} | Failed status: ${res.status}`);
      }
    } catch (e) {
      console.error(e);
    }
  }
}

checkEmbed();
