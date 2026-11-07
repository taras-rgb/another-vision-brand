// Lays out the 24 Pinterest images (layers named ref-01.jpg ... ref-24.jpg) on the
// current page as a masonry reference board with a notes card and a note under each image.
// Run it on the "03 References & Archive" page.
(async () => {
  const page = figma.currentPage;
  if (page.findOne(n => n.name === "Board notes (write here)")) {
    figma.closePlugin("The reference board is already built on this page.");
    return;
  }
  const imgs = page.findAll(n => /^ref-\d\d/.test(n.name)).sort((a, b) => a.name.localeCompare(b.name));
  if (!imgs.length) { figma.closePlugin("No ref-XX images found on this page."); return; }

  const hex = h => ({ r: parseInt(h.slice(1, 3), 16) / 255, g: parseInt(h.slice(3, 5), 16) / 255, b: parseInt(h.slice(5, 7), 16) / 255 });
  const NIGHT = { type: "SOLID", color: hex("#0E1A2B") };
  const CREAM = { type: "SOLID", color: hex("#F4EDE4") };
  for (const s of ["Light", "Regular", "Medium"]) await figma.loadFontAsync({ family: "Onest", style: s });
  const styles = {};
  for (const s of await figma.getLocalTextStylesAsync()) styles[s.name.split("/")[1]] = s.id;
  const fallback = { Title: ["Light", 52], Lead: ["Light", 30], Body: ["Regular", 22], UI: ["Medium", 18] };
  const txt = async (chars, style, w, opacity = 1) => {
    const t = figma.createText();
    if (styles[style]) await t.setTextStyleIdAsync(styles[style]);
    else { t.fontName = { family: "Onest", style: fallback[style][0] }; t.fontSize = fallback[style][1]; }
    t.characters = chars; t.fills = [NIGHT]; t.opacity = opacity;
    if (w) { t.resize(w, t.height); t.textAutoResize = "HEIGHT"; }
    return t;
  };

  let sec = page.findOne(n => n.type === "SECTION" && /^Reference/.test(n.name));
  if (!sec) { sec = figma.createSection(); sec.x = 0; sec.y = 0; }
  sec.name = "Reference board";
  sec.fills = [{ type: "SOLID", color: { r: 0.98, g: 0.976, b: 0.968 } }];
  for (const c of [...sec.children]) if (c.type === "TEXT") c.remove();

  const title = await txt("Reference board", "Title"); sec.appendChild(title); title.x = 100; title.y = 100;

  const intro = figma.createAutoLayout ? figma.createAutoLayout("VERTICAL") : figma.createFrame();
  intro.layoutMode = "VERTICAL"; intro.primaryAxisSizingMode = "AUTO"; intro.counterAxisSizingMode = "AUTO";
  intro.name = "Board notes (write here)"; intro.itemSpacing = 20; intro.fills = [CREAM]; intro.cornerRadius = 24;
  intro.paddingLeft = intro.paddingRight = 56; intro.paddingTop = intro.paddingBottom = 48;
  sec.appendChild(intro); intro.x = 100; intro.y = 200;
  intro.appendChild(await txt("What we take from this board", "Lead"));
  intro.appendChild(await txt("Write here: the mood, what to borrow, what to avoid.", "Body", 1500, 0.45));
  const row = figma.createFrame(); row.name = "Notes columns"; row.layoutMode = "HORIZONTAL";
  row.primaryAxisSizingMode = "AUTO"; row.counterAxisSizingMode = "AUTO"; row.itemSpacing = 48; row.fills = [];
  intro.appendChild(row);
  for (const h of ["Keep", "Avoid", "Try next"]) {
    const c = figma.createFrame(); c.name = h; c.layoutMode = "VERTICAL";
    c.primaryAxisSizingMode = "AUTO"; c.counterAxisSizingMode = "AUTO"; c.itemSpacing = 8; c.fills = [];
    c.appendChild(await txt(h, "UI")); c.appendChild(await txt("Add notes", "Body", 460, 0.45));
    row.appendChild(c);
  }
  intro.appendChild(await txt("Source: pinterest.com/tkindrat5/anothervision2, 24 pins", "UI", 0, 0.6));

  const srcs = ["lauraclink.com", "instagram.com", "fableco.uk", "behance.net, Deltra", "magnific.com", "behance.net, Solwy", "Uploaded", "behance.net", "instagram.com, studio_d121", "instagram.com", "superpower.com", "instagram.com", "tr.ee", "instagram.com", "visualjournal.it", "Uploaded", "Uploaded", "Uploaded", "Uploaded", "behance.net, Lunetra", "t.me, vasilek_diz", "t.me, vasilek_diz", "betwnstudios.com", "Uploaded"];
  const COLS = 5, W = 600, GAP = 48, top0 = 200 + intro.height + 120;
  const colY = Array(COLS).fill(top0);
  for (let i = 0; i < imgs.length; i++) {
    const img = imgs[i]; const n = String(i + 1).padStart(2, "0"); const s = srcs[i] || "";
    const card = figma.createFrame(); card.name = `Ref ${n}, ${s}`; card.layoutMode = "VERTICAL";
    card.primaryAxisSizingMode = "AUTO"; card.counterAxisSizingMode = "AUTO"; card.itemSpacing = 12; card.fills = [];
    sec.appendChild(card);
    img.resize(W, Math.round(W * img.height / img.width)); img.cornerRadius = 12; img.name = "Image";
    card.appendChild(img);
    card.appendChild(await txt(`${n}  ${s}`, "UI", 0, 0.55));
    const note = await txt("Note: what we like here", "Body", W, 0.4); note.name = "Note"; card.appendChild(note);
    const c = colY.indexOf(Math.min(...colY));
    card.x = 100 + c * (W + GAP); card.y = colY[c]; colY[c] += card.height + 64;
  }
  sec.resizeWithoutConstraints(100 + COLS * (W + GAP) - GAP + 100, Math.max(...colY) + 40);
  figma.viewport.scrollAndZoomIntoView([sec]);
  figma.closePlugin(`Reference board built with ${imgs.length} images.`);
})();
