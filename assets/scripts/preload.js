window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
      const element = document.getElementById(selector)
      if (element) element.innerText = text
    }

    const bar = new customTitlebar.Titlebar({
      backgroundColor: customTitlebar.Color.fromHex('#202529'),
      titleHorizontalAlignement: "center",
      icon: null,
      menu: null
  });  
  
  bar.updateTitle(" ")

    for (const type of ['chrome', 'node', 'electron']) {
      replaceText(`${type}-version`, process.versions[type])
    }
  })