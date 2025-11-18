const container = document.querySelector(".jobs-listings");
const paginationNav = document.querySelector(".pagination");

const inputSearch = document.querySelector("#empleos-search-input");
const selectTech = document.querySelector("#filter-technology");
const selectLocation = document.querySelector("#filter-location");
const selectExperience = document.querySelector("#filter-experience-level");

const RESULTS_PER_PAGE = 3;

let jobs = [];
let filteredJobs = [];
let currentPage = 1;

function safeText(s = "") {
  const div = document.createElement("div");
  div.textContent = s;
  return div.innerHTML;
}

function debounce(fn, wait = 200) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), wait);
  };
}

function renderJobsList(items) {
  if (!container) return;
  if (!items.length) {
    container.innerHTML = `<p class="empty">No se encontraron empleos.</p>`;
    return;
  }

  container.innerHTML = items
    .map((job) => {
      const modalidad = job.data?.modalidad ?? "";
      const nivel = job.data?.nivel ?? "";
      const technology = job.data?.technology ?? "";
      return `
      <article class="job-listing-card" data-modalidad="${safeText(
        modalidad
      )}" data-nivel="${safeText(nivel)}" data-technology="${safeText(
        technology
      )}">
        <div>
          <h3>${safeText(job.titulo ?? "Sin título")}</h3>
          <small>${safeText(job.empresa ?? "")} | ${safeText(
        job.ubicacion ?? ""
      )}</small>
          <p>${safeText(job.descripcion ?? "")}</p>
        </div>
        <button class="button-apply-job">Aplicar</button>
      </article>`;
    })
    .join("");
}

function renderPagination(totalItems, page = 1) {
  if (!paginationNav) return;
  const totalPages = Math.max(1, Math.ceil(totalItems / RESULTS_PER_PAGE));
  if (totalPages <= 1) {
    paginationNav.innerHTML = "";
    return;
  }

  const parts = [];
  parts.push(
    `<a href="#" data-page="${Math.max(1, page - 1)}" class="prev">‹</a>`
  );

  const maxButtons = 7;
  let start = Math.max(1, page - Math.floor(maxButtons / 2));
  let end = Math.min(totalPages, start + maxButtons - 1);
  if (end - start + 1 < maxButtons) start = Math.max(1, end - maxButtons + 1);

  for (let p = start; p <= end; p++) {
    parts.push(
      `<a href="#" data-page="${p}" class="${
        p === page ? "is-active" : ""
      }">${p}</a>`
    );
  }

  parts.push(
    `<a href="#" data-page="${Math.min(
      totalPages,
      page + 1
    )}" class="next">›</a>`
  );

  paginationNav.innerHTML = parts.join("");
}

function renderPage(page = 1) {
  currentPage = page;
  const source =
    Array.isArray(filteredJobs) && filteredJobs.length ? filteredJobs : jobs;
  const total = source.length;
  const totalPages = Math.max(1, Math.ceil(total / RESULTS_PER_PAGE));
  if (currentPage > totalPages) currentPage = totalPages;
  const start = (currentPage - 1) * RESULTS_PER_PAGE;
  const pageItems = source.slice(start, start + RESULTS_PER_PAGE);
  renderJobsList(pageItems);
  renderPagination(total, currentPage);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function attachPaginationHandler() {
  if (!paginationNav) return;
  paginationNav.addEventListener("click", (e) => {
    e.preventDefault();
    const a = e.target.closest("a[data-page]");
    if (!a) return;
    const page = Number(a.dataset.page) || 1;
    if (page === currentPage) return;
    renderPage(page);
  });
}

function applyFilters() {
  const q = (inputSearch?.value || "").toLowerCase().trim();
  const tech = (selectTech?.value || "").toLowerCase().trim();
  const location = (selectLocation?.value || "").toLowerCase().trim();
  const exp = (selectExperience?.value || "").toLowerCase().trim();

  filteredJobs = jobs.filter((job) => {
    const title = (job.titulo || "").toLowerCase();
    const company = (job.empresa || "").toLowerCase();
    const description = (job.descripcion || "").toLowerCase();
    const ubicacion = (job.ubicacion || "").toLowerCase();
    const nivel = (job.data?.nivel || "").toLowerCase();
    const modalidad = (job.data?.modalidad || "").toLowerCase();
    let techs = "";
    if (Array.isArray(job.data?.technology))
      techs = job.data.technology.join(" ").toLowerCase();
    else techs = (job.data?.technology || "").toLowerCase();

    const matchesQ =
      !q ||
      title.includes(q) ||
      company.includes(q) ||
      description.includes(q) ||
      techs.includes(q);
    const matchesTech = !tech || techs.includes(tech);
    const matchesLocation = !location || ubicacion.includes(location);
    const matchesExp = !exp || nivel.includes(exp);

    return matchesQ && matchesTech && matchesLocation && matchesExp;
  });

  currentPage = 1;
  renderPage(1);
}

function attachFilterListeners() {
  if (inputSearch)
    inputSearch.addEventListener("input", debounce(applyFilters, 250));
  if (selectTech) selectTech.addEventListener("change", applyFilters);
  if (selectLocation) selectLocation.addEventListener("change", applyFilters);
  if (selectExperience)
    selectExperience.addEventListener("change", applyFilters);
}

fetch("./data.json")
  .then((response) => {
    if (!response.ok) throw new Error("No se pudo cargar data.json");
    return response.json();
  })
  .then((data) => {
    jobs = Array.isArray(data) ? data : [];
    filteredJobs = jobs.slice();
    attachPaginationHandler();
    attachFilterListeners();
    renderPage(1);
  })
  .catch((err) => {
    console.error("Error al cargar empleos:", err);
    if (container)
      container.innerHTML = `<p class="empty">Error al cargar datos.</p>`;
  });
