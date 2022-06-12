let firebaseUrl = "https://cars-dcba0-default-rtdb.firebaseio.com";

let pozorista = {};
let predstave = {};
let korisnici = {};

//izmena_korisnika.html
function getIzmenaKorisnika(){
	let request = new XMLHttpRequest();
	var baseUrl = (window.location).href;
	var id_korisnika = baseUrl.substring(baseUrl.lastIndexOf('=') + 1);

	request.onreadystatechange = function () {
		if (this.readyState == 4) {
		if (this.status == 200) {

			korisnici = JSON.parse(request.responseText);

			for (let id in korisnici){
				if(id == id_korisnika){
					korisnik = korisnici[id];
					formaKorisnik("forma_korisnici", id, korisnik);
				}
			} 

		} else {
			alert("Greška prilikom učitavanja korisnika.");
		}
		}
	};
	request.open("GET", firebaseUrl + "/korisnici.json");
	request.send();
}

function formaKorisnik(tBody, id,  korisnik){
	let forma_korisnici = document.createElement("form");
	forma_korisnici.setAttribute("class", "form-container");
	forma_korisnici.style = "max-width: 100%;";

	let korisnicko_ime = document.createElement("label");
	korisnicko_ime.innerText = "Korisnicko Ime";
	let korisnicko_ime1 = document.createElement("input");
	korisnicko_ime1.type = "text";
	korisnicko_ime1.value = korisnik.korisnickoIme;
	korisnicko_ime1.setAttribute("id", "korisnicko_ime");
	korisnicko_ime1.setAttribute("required", "true");
	forma_korisnici.append(korisnicko_ime, korisnicko_ime1);

	let lozinka = document.createElement("label");
	lozinka.innerText = "Loznika";
	let lozinka1 = document.createElement("input");
	lozinka1.type = "text";
	lozinka1.value = korisnik.lozinka;
	lozinka1.setAttribute("id", "lozinka");
	lozinka1.setAttribute("required", "true");
	forma_korisnici.append(lozinka, lozinka1);

	let email = document.createElement("label");
	email.innerText = "Email";
	let email1 = document.createElement("input");
	email1.type = "email";
	email1.value = korisnik.email;
	email1.setAttribute("id", "email");
	email1.setAttribute("required", "true");
	forma_korisnici.append(email, email1);

	let ime = document.createElement("label");
	ime.innerText = "Ime";
	let ime1 = document.createElement("input");
	ime1.type = "text";
	ime1.value = korisnik.ime;
	ime1.setAttribute("id", "ime");
	ime1.setAttribute("required", "true");
	forma_korisnici.append(ime, ime1);

	let prezime = document.createElement("label");
	prezime.innerText = "Prezime";
	let prezime1 = document.createElement("input");
	prezime1.type = "text";
	prezime1.value = korisnik.prezime;
	prezime1.setAttribute("id", "prezime");
	prezime1.setAttribute("required", "true");
	forma_korisnici.append(prezime, prezime1);

	let datum_rodjenja = document.createElement("label");
	datum_rodjenja.innerText = "Datum Rodjenja";
	let datum_rodjenja1 = document.createElement("input");
	datum_rodjenja1.type = "date";
	datum_rodjenja1.value = korisnik.datumRodjenja;
	datum_rodjenja1.setAttribute("id", "datum_rodjenja");
	datum_rodjenja1.setAttribute("required", "true");
	forma_korisnici.append(datum_rodjenja, datum_rodjenja1);

	let adresa = document.createElement("label");
	adresa.innerText = "Adresa";
	let adresa1 = document.createElement("input");
	adresa1.type = "text";
	adresa1.value = korisnik.adresa;
	adresa1.setAttribute("id", "adresa");
	adresa1.setAttribute("required", "true");
	forma_korisnici.append(adresa, adresa1);

	let broj_telefona = document.createElement("label");
	broj_telefona.innerText = "Broj Telefona";
	let broj_telefona1 = document.createElement("input");
	broj_telefona1.type = "tel";
	broj_telefona1.value = korisnik.telefon;
	broj_telefona1.setAttribute("id", "broj_telefona");
	broj_telefona1.setAttribute("required", "true");
	forma_korisnici.append(broj_telefona, broj_telefona1);

	let dugme_sacuvaj = document.createElement("button");
	dugme_sacuvaj.innerText = "Sacuvaj Promene"; 
	dugme_sacuvaj.setAttribute("class", "btn sacuvaj");
	dugme_sacuvaj.setAttribute("type", "submit");
	forma_korisnici.append(dugme_sacuvaj);
		
		let editForm = document.getElementById("forma_korisnici");
			editForm.addEventListener("submit", function (e) {
			e.preventDefault();

			let korisnicko_ime2 = document.querySelector("#korisnicko_ime").value.trim();
			let lozinka2 = document.querySelector("#lozinka").value.trim();
			let email2 = document.querySelector("#email").value;
			console.log(email2);
			let ime2 = document.querySelector("#ime").value.trim();
			let prezime2 = document.querySelector("#prezime").value.trim();
			let datum_rodjenja2 = document.querySelector("#datum_rodjenja").value;
			let adresa2 = document.querySelector("#adresa").value.trim();
			let broj_telefona2 = document.querySelector("#broj_telefona").value;

			if (korisnicko_ime2 != "") {
				korisnik.korisnickoIme = korisnicko_ime2;
			}
			if (lozinka2 != "") {
				var numbers = /[0-9]/g;
				var lowerCaseLetters = /[a-z]/g;
				if(lozinka2.length > 8 && lozinka2.match(numbers) && lozinka2.match(lowerCaseLetters)){
					korisnik.lozinka = lozinka2;
				}else{
					alert("Lozinka mora da sadrzi minimum 8 karaktera, brojeve i slova!");
				}
			}
			if (email2 != "") {
				korisnik.email= email2;
			}
			if (ime2 != "") {
				korisnik.ime = ime2;
			}
			if (prezime2 != "") {
				korisnik.prezime = prezime2;
			}
			if (datum_rodjenja2 != "") {
				korisnik.datumRodjenja = datum_rodjenja2;
			}
			if (adresa2 != "") {
				korisnik.adresa = adresa2;
			}
			if (broj_telefona2 != ""  &&  isNaN(broj_telefona2)== false) {
				let duzina = broj_telefona2.length;
				console.log(duzina);
				if(duzina > 8  && duzina < 11){
					korisnik.telefon = broj_telefona2;
				}else{
					alert("Broj koji ste uneli nije validan!");
					}
			}else{
				if(broj_telefona2 != ""){
					alert("Broj telefona ne moze da sadrzi slova!");	
				}
			}

			let putRequest = new XMLHttpRequest();

			putRequest.onreadystatechange = function (e) {
			if (this.readyState == 4) {
				if (this.status == 200) {
					let baseUrl = window.location.href;
					let odseceno = baseUrl.substring(baseUrl.lastIndexOf('/izmena_korisnika.html')+1);
					let konacno = baseUrl.replace(odseceno, "");
					window.location.href = konacno + "admin.html";
				} else {
				alert("Greška prilikom izmene korisnika.");
				}
			}
			};

			putRequest.open("PUT", firebaseUrl + "/korisnici/" + id + ".json");
			putRequest.send(JSON.stringify(korisnik));
			});

	let dugme_nazad = document.createElement("button");
	dugme_nazad.innerText = "Vrati se na Predhodnu Stranicu"; 
	dugme_nazad.setAttribute("class", "btn cancel");
	dugme_nazad.setAttribute("type", "button");
	dugme_nazad.setAttribute("onclick", "window.location.href='korisnik.html?id=" + id +"'");
	forma_korisnici.append(dugme_nazad);

	document.getElementById(tBody).appendChild(forma_korisnici);
}
//izmena_korisnika.html

//izmena_predstava.html
function getIzmenaPredstava(){
	let request = new XMLHttpRequest();
	var baseUrl = (window.location).href;
	var s = baseUrl.substring(baseUrl.lastIndexOf('=') + 1);
	s = s.split("$");
	let id_predstava = s[1];
	let id_predstave = s[2];
	let id = s[0] + "$" + s[1]+ "$" + s[2];

	request.onreadystatechange = function () {
		if (this.readyState == 4) {
		if (this.status == 200) {

			predstave = JSON.parse(request.responseText);
			let predstava = predstave[id_predstava][id_predstave];

			formaPredstava("forma_predstava", id, predstave ,predstava);
		
		} else {
			alert("Greška prilikom učitavanja predstave.");
		}
		}
	};
	request.open("GET", firebaseUrl + "/predstave.json");
	request.send();
}

function formaPredstava(tBody, id, predstave, predstava){
	let forma_predstava = document.createElement("form");
	forma_predstava.setAttribute("class", "form-container");
	forma_predstava.style = "max-width: 100%;";

	let naziv = document.createElement("label");
	naziv.innerText = "Naziv Predstave\n";
	let naziv1 = document.createElement("input");
	naziv1.type = "text";
	naziv1.value = predstava.naziv;
	naziv1.setAttribute("id", "naziv");
	naziv1.setAttribute("required", "true");
	forma_predstava.append(naziv, naziv1);

	let kratak_opis = document.createElement("label");
	kratak_opis.innerText = "Kratak Opis\n";
	let kratak_opis1 = document.createElement("textarea");
	kratak_opis1.innerText = predstava.kratakOpis;
	kratak_opis1.setAttribute("rows", 5);
	kratak_opis1.style = "background-color: #9E8D5F!important;";
	kratak_opis1.setAttribute("id", "kratak_opis");
	kratak_opis1.setAttribute("required", "true");
	forma_predstava.append(kratak_opis, kratak_opis1);

	let kod = document.createElement("label");
	kod.innerText = "Kod Predstave \n";
	let kod1 = document.createElement("input");
	kod1.type = "text";
	kod1.value = predstava.kod;
	kod1.setAttribute("id", "kod");
	kod1.setAttribute("required", "true");
	forma_predstava.append(kod, kod1);

	let zanr = document.createElement("label");
	zanr.innerText = "Zanr\n";
	let zanr1 = document.createElement("input");
	zanr1.type = "text";
	zanr1.value = predstava.zanr;
	zanr1.setAttribute("id", "zanr");
	zanr1.setAttribute("required", "true");
	forma_predstava.append(zanr, zanr1);

	let vreme = document.createElement("label");
	vreme.innerText = "Vreme Trajanja\n";
	let vreme1 = document.createElement("input");
	vreme1.type = "number";
	vreme1.value = predstava.trajanje;
	vreme1.setAttribute("id", "vreme_trajanja");
	vreme1.setAttribute("required", "true");
	forma_predstava.append(vreme, vreme1);

	let cena = document.createElement("label");
	cena.innerText = "Cena Karte\n";
	let cena1 = document.createElement("input");
	cena1.type = "number";
	cena1.value = predstava.cena;
	cena1.setAttribute("id", "cena");
	cena1.setAttribute("required", "true");
	forma_predstava.append(cena, cena1);

	let max_osobe = document.createElement("label");
	max_osobe.innerText = "Maksimalan Broj Osoba\n";
	let max_osobe1 = document.createElement("input");
	max_osobe1.type = "number";
	max_osobe1.value = predstava.maxOsobe;
	max_osobe1.setAttribute("id", "max_osobe");
	max_osobe1.setAttribute("required", "true");
	forma_predstava.append(max_osobe, max_osobe1);

	let detaljan_opis = document.createElement("label");
	detaljan_opis.innerText = "Detaljan Opis\n";
	let detaljan_opis1 = document.createElement("textarea");
	detaljan_opis1.setAttribute("id", "detaljan_opis");
	detaljan_opis1.setAttribute("required", "true");
	detaljan_opis1.setAttribute("rows", 10);
	detaljan_opis1.style = "background-color: #9E8D5F!important;";
	detaljan_opis1.innerText = predstava.opis ;
	forma_predstava.append(detaljan_opis, detaljan_opis1);


	let dugme_sacuvaj = document.createElement("button");
	dugme_sacuvaj.innerText = "Sacuvaj Promene"; 
	dugme_sacuvaj.setAttribute("class", "btn sacuvaj");
	dugme_sacuvaj.setAttribute("type", "submit");
	forma_predstava.append(dugme_sacuvaj);

		let editForm = document.getElementById("forma_predstava");
		editForm.addEventListener("submit", function (e) {
		e.preventDefault();

		let naziv2 = document.querySelector("#naziv").value.trim();
		let kratak_opis2 = document.querySelector("#kratak_opis").value.trim();
		let kod2 = document.querySelector("#kod").value.trim();
		let zanr2 = document.querySelector("#zanr").value.trim();
		let vreme2 = document.querySelector("#vreme_trajanja").valueAsNumber;
		let cena2 = document.querySelector("#cena").valueAsNumber;
		let max_osobe2 = document.querySelector("#max_osobe").valueAsNumber;
		let detaljan_opis2 = document.querySelector("#detaljan_opis").value.trim();


		if (naziv2 != "") {
			predstava.naziv = naziv2;
		}
		if (kratak_opis2 != "") {
			predstava.kratakOpis = kratak_opis2;
		}
		if (kod2 != "") {
			s = id.split("$");
			let id_predstava = s[1];
			let lista_predstava = predstave[id_predstava];
			let count = 0;
			console.log(lista_predstava);
			for (let i in lista_predstava){
				if(lista_predstava[i].kod == kod2 && i != s[2]){
					count = count + 1;
				}
			}
			if(count == 0){
				predstava.kod= kod2;
			}else{
				alert("Kod koji ste uneli vec je dodeljen nekoj predstavi!\nNije moguce izvrsiti izmenu podataka.");
			}
			
		}
		if (zanr2 != "") {
			predstava.zanr = zanr2;
		}
		if (isNaN(vreme2) == false) {
			predstava.trajanje = vreme2;
		}
		if (isNaN(cena2) == false) {
			predstava.cena = cena2;
		}
		if (isNaN(max_osobe2) == false) {
			predstava.maxOsobe = max_osobe2;
		}
		if (detaljan_opis2 != "") {
			predstava.opis = detaljan_opis2;
		}

		let putRequest = new XMLHttpRequest();

		putRequest.onreadystatechange = function (e) {
		if (this.readyState == 4) {
			if (this.status == 200) {
				let baseUrl = window.location.href;
				let odseceno = baseUrl.substring(baseUrl.lastIndexOf('/izmena_korisnika.html')+1);
				let konacno = baseUrl.replace(odseceno, "");
				window.location.href = konacno + "predstava.html?id=" + id ;
			} else {
			alert("Greška prilikom izmene korisnika.");
			}
		}
		};

		let id_predstava = id.split("$");

		putRequest.open("PUT", firebaseUrl + "/predstave/" + id_predstava[1] + "/" + id_predstava[2] + ".json");
		putRequest.send(JSON.stringify(predstava));
		});

	let dugme_nazad = document.createElement("button");
	dugme_nazad.innerText = "Vrati se na Predhodnu Stranicu"; 
	dugme_nazad.setAttribute("class", "btn cancel");
	dugme_nazad.setAttribute("type", "button");
	dugme_nazad.setAttribute("onclick", "window.location.href='predstava.html?id=" + id +"'");
	forma_predstava.append(dugme_nazad);

	document.getElementById(tBody).appendChild(forma_predstava);
}
//izmena_predstava.html