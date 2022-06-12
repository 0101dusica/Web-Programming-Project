let firebaseUrl = "https://cars-dcba0-default-rtdb.firebaseio.com";

let pozorista = {};
let predstave = {};
let korisnici = {};
let komentari = {};

//f-je POZORISTA / main.html
function getPozorista() {
	let request = new XMLHttpRequest();
	var baseUrl = (window.location).href;
	var id_korisnika = baseUrl.substring(baseUrl.lastIndexOf('.html') +5);
	if(id_korisnika != ""){
		id_korisnika = baseUrl.substring(baseUrl.lastIndexOf('=') + 1);
	}

	request.onreadystatechange = function () {
		if (this.readyState == 4) {
		if (this.status == 200) {
			obrisi("all_pozorista");

			formaPrijava("myForm", id_korisnika);
			pozorista = JSON.parse(request.responseText);

			for (let id in pozorista) {
				let pozoriste = pozorista[id];
				dodajPozoriste("all_pozorista", id, pozoriste);
			}
		} else {
			alert("Greška prilikom učitavanja svih pozorista.");
		}
		}
	};

	request.open("GET", firebaseUrl + "/pozorista.json");
	request.send();
}
function dodajPozoriste(tBody, id, pozoriste) {
	let pozoriste_red = document.createElement("tr");
  
	let slika_pozoriste = document.createElement("td");
	slika_pozoriste.style = "width: 40%;";
		let slika = document.createElement("img");
		slika.src = pozoriste.slika;
		slika.style = "width: 80%; height: 80%;";
		slika_pozoriste.append(slika);
	pozoriste_red.appendChild(slika_pozoriste);

	let podaci = document.createElement("td");
	podaci.style = "width: 60%; ";
	podaci.setAttribute("class", "pozoriste")
		naziv = document.createElement("a");
		naziv.innerText = pozoriste.naziv + "\n";
		naziv.setAttribute("href", "stranice/pozoriste.html?id=" + id);
		naziv.setAttribute("class", "p-naslov");

		adresa = document.createElement("a");
		adresa.innerText = "Repertoar:" + pozoriste.adresa + "\n";
		adresa.setAttribute("class", "p-opis");

		repertoar = document.createElement("a");
		repertoar.innerText = "Repertoar:" + pozoriste.brojPredstava + "\n";
		repertoar.setAttribute("class", "p-opis");

		podaci.append(naziv);
		podaci.append(adresa);
		podaci.append(repertoar);
	pozoriste_red.appendChild(podaci);
  
	document.getElementById(tBody).appendChild(pozoriste_red);
}
function obrisi(tBodyId) {
	let tBody = document.getElementById(tBodyId);
	while (tBody.firstChild) {
	  tBody.removeChild(tBody.lastChild);
	}
}
//main.html

//pozoriste.html
function getPredstave() { //ucitava se prilikom otvaranja stranice pozoriste.html, prikazuje naslov i listu predstava koje to pozoriste ima na repertoaru
	let request1 = new XMLHttpRequest();
	let request = new XMLHttpRequest();
	request1.onreadystatechange = function () {
		if (this.readyState == 4) {
		if (this.status == 200) {

			pozorista = JSON.parse(request1.responseText);
			var baseUrl = (window.location).href;
			var id_pozorista = baseUrl.substring(baseUrl.lastIndexOf('=') + 1); //vraca id predstave koji treba da pronadjemo u listi i zatim ispisemo predstave
			let id_predstave = pozorista[id_pozorista].idPredstava;
			var pozoriste = pozorista[id_pozorista];
			console.log(id_pozorista);
			nazivPozorista("naziv_pozorista", pozoriste);
			
			request.onreadystatechange = function () {
				if (this.readyState == 4) {
				if (this.status == 200) {
					let predstave = JSON.parse(request.responseText);
					console.log(predstave);
					let predstave_novo = predstave[id_predstave];
					console.log(predstave_novo);
					
					for (let id in predstave_novo) {
						let predstava = predstave_novo[id];
						dodajPredstavu("all_predstave",id_pozorista, id_predstave, id, predstava);
					}
				} else {
					alert("Greška prilikom učitavanja svih predstava.");
				}
				}}
			request.open("GET", firebaseUrl + "/predstave.json");
			request.send();
	};};}

	request1.open("GET", firebaseUrl + "/pozorista.json");
	request1.send();
}
function nazivPozorista(tBody, pozoriste){ // naslov koji stoji prilikom otvaranja stranice pozoriste.html
	let naziv_pozorista = document.createElement("a");
	naziv_pozorista.innerText = pozoriste.naziv + " | Reperotar";
  
	document.getElementById(tBody).appendChild(naziv_pozorista);
}
function dodajPredstavu(tBody, id_pozorista, id_predstave, id, predstava) {
	let predstava_red = document.createElement("tr");
  
	let slika_predstava = document.createElement("td");
	slika_predstava.style = "width: 40%;";
		let slika = document.createElement("img");
		slika.src = predstava.slika;
		slika.style = "width: 80%; height: 80%;";
		slika_predstava.append(slika);
	predstava_red.appendChild(slika_predstava);

	let podaci = document.createElement("td");
	podaci.style = "width: 60%; ";
	podaci.setAttribute("class", "pozoriste")
		naziv = document.createElement("a");
		naziv.innerText = predstava.naziv + "\n";
		naziv.setAttribute("href", "predstava.html?id=" + id_pozorista +"$" + id_predstave + "$" + id);
		naziv.setAttribute("class", "p-naslov");
		
		zanr = document.createElement("a");
		zanr.innerText = "Zanr:" + predstava.zanr + "\n";
		zanr.setAttribute("class", "p-opis");

		vreme = document.createElement("a");
		vreme.innerText = "Vreme Trajanja:" + predstava.trajanje + "\n";
		vreme.setAttribute("class", "p-opis");

		cena = document.createElement("a");
		cena.innerText = "Cena karte:" + predstava.cena + "\n";
		cena.setAttribute("class", "p-opis");

		podaci.append(naziv);
		podaci.append(zanr);
		podaci.append(vreme);
		podaci.append(cena);
	predstava_red.appendChild(podaci);
  
	document.getElementById(tBody).appendChild(predstava_red);
}
//pozoriste.html

//predstava.html
function getOpisPredstave(){
	let request = new XMLHttpRequest();
	let request1 = new XMLHttpRequest();
	var baseUrl = (window.location).href;
	var id_zajedno = baseUrl.substring(baseUrl.lastIndexOf('=') + 1);
	let s = id_zajedno.split("$");
	let id_predstava = s[1];
	let id_predstave = s[2];
	let id = s[0] + "$" + s[1] + "$" + s[2];

	request.onreadystatechange = function () {
		if (this.readyState == 4) {
		if (this.status == 200) {
			obrisi("opis_naziv");
			obrisi("opis_kratakOpis");
			obrisi("opis_tabela");
			obrisi("opis_detaljanOpis");
			obrisi("prosecna_ocena");
			obrisi("zvezdice");
			obrisi("ocene_broj_pet");
			obrisi("ocene_broj_cetiri");
			obrisi("ocene_broj_tri");
			obrisi("ocene_broj_dva");
			obrisi("ocene_broj_jedan");
			obrisi("izmena_predstava");
			obrisi("obrisi_predstavu");
			obrisi("komentar_lista");
			obrisi("forma_komentara");

			
			predstave = JSON.parse(request.responseText);
			predstava = predstave[id_predstava][id_predstave];

			opisNaziv("opis_naziv", predstava);
			opisKratakOpis("opis_kratakOpis", predstava);
			opisTabela("opis_tabela", predstava);
			opisDetaljanOpis("opis_detaljanOpis", predstava);
			opisZvezdice("zvezdice", predstava);
			opisProsecnaOcena("prosecna_ocena", predstava);
			opisOceneBrojPet("ocene_broj_pet", predstava);
			opisOceneBrojCetiri("ocene_broj_cetiri", predstava);
			opisOceneBrojTri("ocene_broj_tri", predstava);
			opisOceneBrojDva("ocene_broj_dva", predstava);
			opisOceneBrojJedan("ocene_broj_jedan", predstava);
			barPet(predstava);
			barCetiri(predstava);
			barTri(predstava);
			barDva(predstava);
			barJedan(predstava);
			izmena_predstave("izmena_predstava", id);
			brisanjePredstave("obrisi_predstavu",id);

			request1.onreadystatechange = function () {
			if (this.readyState == 4) {
			if (this.status == 200) {
				komentari = JSON.parse(request1.responseText);
				let komentari_lista = komentari[s[2]]; 
				if(komentari_lista == undefined){
					prazniKomentari("komentar_lista");
				}
				for (let j in komentari_lista){
					komentar = komentari_lista[j];
					console.log(komentar);
					if(komentar != null){
						ucitajKomentare("komentar_lista", j, komentar, 80);
						
					}
					
				}
				formaKomentara("forma_komentara");
			} 
			}
			};

			request1.open("GET", firebaseUrl + "/komentari.json");
			request1.send();
			

		} else {
			alert("Greška prilikom učitavanja svih predstava.");
		}
		}
	};

	request.open("GET", firebaseUrl + "/predstave.json");
	request.send();
}
function opisNaziv(tBody, predstava){

	let naziv_predstave = document.createElement("a");
	naziv_predstave.innerText = predstava.naziv + " | " + predstava.zanr;

	document.getElementById(tBody).appendChild(naziv_predstave);

}
function opisKratakOpis(tBody, predstava){

	let kratak_opis = document.createElement("a");
	kratak_opis.innerText = predstava.kratakOpis + "\n"; 
	kratak_opis.setAttribute("class", "p-opis2");

	document.getElementById(tBody).appendChild(kratak_opis);

}
function opisTabela(tBody, predstava){

	let red = document.createElement("tr");
	let levo = document.createElement("td");
	levo.style = "width: 60%; text-align: left;padding: 3%;";

		let kodPredstave = document.createElement("a");
		kodPredstave.innerText = "Kod Predstave: ";
		kodPredstave.setAttribute("class", "p-naslov2");
		levo.append(kodPredstave);
		let kodPredstave2 = document.createElement("a");
		kodPredstave2.innerText = predstava.kod + "\n";
		kodPredstave2.setAttribute("class", "p-opis2");
		levo.append(kodPredstave2);

		let zanr = document.createElement("a");
		zanr.innerText = "Zanr: ";
		zanr.setAttribute("class", "p-naslov2");
		levo.append(zanr);
		let zanr2 = document.createElement("a");
		zanr2.innerText = predstava.zanr + "\n";
		zanr2.setAttribute("class", "p-opis2");
		levo.append(zanr2);

		let vreme = document.createElement("a");
		vreme.innerText = "Vreme Trajanja: ";
		vreme.setAttribute("class", "p-naslov2");
		levo.append(vreme);
		let vreme2 = document.createElement("a");
		vreme2.innerText = predstava.trajanje + " min\n";
		vreme2.setAttribute("class", "p-opis2");
		levo.append(vreme2);

		let cena = document.createElement("a");
		cena.innerText = "Cena Karte: ";
		cena.setAttribute("class", "p-naslov2");
		levo.append(cena);
		let cena2 = document.createElement("a");
		cena2.innerText = predstava.cena + " din\n";
		cena2.setAttribute("class", "p-opis2");
		levo.append(cena2);

		let osobe = document.createElement("a");
		osobe.innerText = "Maksimalan Broj Osoba: ";
		osobe.setAttribute("class", "p-naslov2");
		levo.append(osobe);
		let osobe2 = document.createElement("a");
		osobe2.innerText = predstava.maxOsobe + "\n";
		osobe2.setAttribute("class", "p-opis2");
		levo.append(osobe2);

	let desno = document.createElement("td");
	desno.style = "width: 40%; padding: 3%;";

		let slika = document.createElement("img");
		slika.src = predstava.slika;
		slika.style = "width: 100%; height: 100%;";
		desno.append(slika);

	red.append(levo, desno);

	document.getElementById(tBody).appendChild(red);

}
function opisDetaljanOpis(tBody, predstava){

	let duzi_opis = document.createElement("a");
	duzi_opis.innerText = predstava.opis + "\n\n"; 
	duzi_opis.setAttribute("class", "p-opis2");
	duzi_opis.style = "text-align: justify !important;";
	

	document.getElementById(tBody).appendChild(duzi_opis);
}
function opisProsecnaOcena(tBody, predstava){ //prikazuje prosecnu ocenu

	let ocena = document.createElement("a");
	let broj_ocena = predstava.ocene[0]+predstava.ocene[1]+predstava.ocene[2]+predstava.ocene[3]+ predstava.ocene[4];
	ocena.innerText = predstava.ocena + ", bazirano na " + broj_ocena +" ocena.\n"; 
	ocena.setAttribute("class", "p-opis2");

	document.getElementById(tBody).appendChild(ocena);
}
function opisOceneBrojPet(tBody, predstava){

	let broj_ocena = predstava.ocene;
	
	let pet = document.createElement("a");
	pet.innerText = broj_ocena[4] + "\n";
	pet.setAttribute("class", "p-naslov2");
	
	document.getElementById(tBody).appendChild(pet);
}
function opisOceneBrojCetiri(tBody, predstava){

	let broj_ocena = predstava.ocene;
	
	let cetiri = document.createElement("a");
	cetiri.innerText = broj_ocena[3] + "\n";
	cetiri.setAttribute("class", "p-naslov2");
	
	document.getElementById(tBody).appendChild(cetiri);
}
function opisOceneBrojTri(tBody, predstava){

	let broj_ocena = predstava.ocene;
	
	let tri = document.createElement("a");
	tri.innerText = broj_ocena[2] + "\n";
	tri.setAttribute("class", "p-naslov2");
	
	document.getElementById(tBody).appendChild(tri);
}
function opisOceneBrojDva(tBody, predstava){

	let broj_ocena = predstava.ocene;
	
	let dva = document.createElement("a");
	dva.innerText = broj_ocena[1] + "\n";
	dva.setAttribute("class", "p-naslov2");
	
	document.getElementById(tBody).appendChild(dva);
}
function opisOceneBrojJedan(tBody, predstava){
	let broj_ocena = predstava.ocene;
	
	let jedan = document.createElement("a");
	jedan.innerText = broj_ocena[0] + "\n";
	jedan.setAttribute("class", "p-naslov2");
	
	document.getElementById(tBody).appendChild(jedan);
}
function barPet(predstava){
	
	let ukupan_br_ocena = predstava.ocene[0]+predstava.ocene[1]+predstava.ocene[2]+predstava.ocene[3]+ predstava.ocene[4];
	
	let pet = predstava.ocene[4];

	let procenat = (pet/ukupan_br_ocena)*100 ;
	document.getElementById("skills pet").setAttribute('style','width:'+ procenat +'% !important;');
}
function barCetiri(predstava){
	
	let ukupan_br_ocena = predstava.ocene[0]+predstava.ocene[1]+predstava.ocene[2]+predstava.ocene[3]+ predstava.ocene[4];
	
	let cetiri = predstava.ocene[3];

	let procenat = (cetiri/ukupan_br_ocena)*100 ;
	document.getElementById("skills cetiri").setAttribute('style','width:'+ procenat +'% !important;');
}
function barTri(predstava){
	
	let ukupan_br_ocena = predstava.ocene[0]+predstava.ocene[1]+predstava.ocene[2]+predstava.ocene[3]+ predstava.ocene[4];
	
	let tri = predstava.ocene[2];

	let procenat = (tri/ukupan_br_ocena)*100 ;
	document.getElementById("skills tri").setAttribute('style','width:'+ procenat +'% !important;');
}
function barDva(predstava){
	
	let ukupan_br_ocena = predstava.ocene[0]+predstava.ocene[1]+predstava.ocene[2]+predstava.ocene[3]+ predstava.ocene[4];
	
	let dva = predstava.ocene[1];

	let procenat = (dva/ukupan_br_ocena)*100 ;
	document.getElementById("skills dva").setAttribute('style','width:'+ procenat +'% !important;');
}
function barJedan(predstava){
	
	let ukupan_br_ocena = predstava.ocene[0]+predstava.ocene[1]+predstava.ocene[2]+predstava.ocene[3]+ predstava.ocene[4];
	
	let jedan = predstava.ocene[0];

	let procenat = (jedan/ukupan_br_ocena)*100 ;
	document.getElementById("skills jedan").setAttribute('style','width:'+ procenat +'% !important;');
}
function izmena_predstave(tBody, id){
	let dugme_izmena = document.createElement("button");
	dugme_izmena.innerText = "Izmenite Podatke o Predstavi"; 
	dugme_izmena.setAttribute("class", "o");
	dugme_izmena.setAttribute("type", "submit");
	dugme_izmena.setAttribute("onclick", "window.location.href='izmena_predstava.html?id=" + id +"'");
	dugme_izmena.style = "margin-left: 0%!important;";

	document.getElementById(tBody).appendChild(dugme_izmena);
}
function brisanjePredstave(tBody, id) {
	let deleteBtn = document.createElement("button");
	deleteBtn.innerText = "Obrisi Predstavu";
	deleteBtn.style = "margin-left: 0%!important; background-color: rgb(59, 10, 10)!important;";
	deleteBtn.setAttribute("class", "o");
	deleteBtn.onclick = obrisiPredstavu;
	deleteBtn.setAttribute("type", "button");
	deleteBtn.setAttribute("data-id", id);

	document.getElementById(tBody).appendChild(deleteBtn);
}
function obrisiPredstavu() {
	let text = "Da li ste sigurni da zelite da obriste predstavu iz repertoara?\n";
	if (confirm(text) == true) {
		let clickedBtn = this;
		let id = clickedBtn.getAttribute("data-id");

		let id_predstava = id.split("$");
		let id_pozorista = id_predstava[0];

		let request = new XMLHttpRequest();

		request.onreadystatechange = function () {
			if (this.readyState == 4) {
			if (this.status == 200) {
				let baseUrl = window.location.href;
				let odseceno = baseUrl.substring(baseUrl.lastIndexOf('/predstava.html')+1);
				let konacno = baseUrl.replace(odseceno, "");
				window.location.href = konacno + "pozoriste.html?id=" + id_pozorista ;
			} else {
				alert("Greška prilikom brisanja predstave.");
			}
			}
		};

		request.open("DELETE", firebaseUrl + "/predstave/" + id_predstava[1] + "/" + id_predstava[2] + ".json");
		request.send();
	}
}
function opisZvezdice(tBody){
	let id = 1;
	let zvezde = document.createElement("div");
	while ( id < 6 ){
		let zvezdica1 = document.createElement("button");
		zvezdica1.setAttribute("class", "fa fa-star checked");
		zvezdica1.onclick = indeksZvezde;
		zvezdica1.setAttribute("type", "button");
		zvezdica1.setAttribute("data-id", id);
		zvezde.append(zvezdica1);
		id = id+1;
	}

	document.getElementById(tBody).appendChild(zvezde);
}
function indeksZvezde(){
	let clickedBtn = this;
	let id_zvezdice = clickedBtn.getAttribute("data-id");

	let request = new XMLHttpRequest();
	var baseUrl = (window.location).href;
	var id_zajedno = baseUrl.substring(baseUrl.lastIndexOf('=') + 1);
	let nova_predstava;
	s = id_zajedno.split("$");
	id_predstava = s[1];
	id_predstave = s[2];

	request.onreadystatechange = function () {
		if (this.readyState == 4) {
		if (this.status == 200) {

			let predstave = JSON.parse(request.responseText);
			let predstava = predstave[id_predstava][id_predstave];
			nova_predstava = predstava;
			if(id_zvezdice == 1){
				nova_predstava.ocene[0] +=1;
				alert("Ocenili ste pesmu sa 1 zvezdicom!");
			}else if( id_zvezdice == 2){
				nova_predstava.ocene[1] +=1;
				alert("Ocenili ste pesmu sa 2 zvezdice!");
			}else if(id_zvezdice == 3){
				nova_predstava.ocene[2] +=1;
				alert("Ocenili ste pesmu sa 3 zvezdice!");
			}else if(id_zvezdice == 4){
				nova_predstava.ocene[3] +=1;
				alert("Ocenili ste pesmu sa 4 zvezdice!");
			}else if(id_zvezdice == 5){
				nova_predstava.ocene[4] +=1;
				alert("Ocenili ste pesmu sa 5 zvezdica!");
			}

			nova_predstava.ocena = (nova_predstava.ocene[0]*1 + nova_predstava.ocene[1]*2 + nova_predstava.ocene[2]*3 + nova_predstava.ocene[3]*4 + nova_predstava.ocene[4]*5)/(nova_predstava.ocene[0]+nova_predstava.ocene[1]+nova_predstava.ocene[2]+nova_predstava.ocene[3]+nova_predstava.ocene[4]);
			nova_predstava.ocena = Number(nova_predstava.ocena.toFixed(2));
			let request1 = new XMLHttpRequest();
			request1.onreadystatechange = function () {
				if (this.readyState == 4) {
				if (this.status == 200) {
					getOpisPredstave();
			};}}
			console.log(firebaseUrl + "/predstave/"+ id_predstava + "/"+  id_predstave+".json");
			request1.open("PUT", firebaseUrl + "/predstave/"+ id_predstava + "/"+  id_predstave+".json");
			request1.send(JSON.stringify(nova_predstava));
		}}
	};

	request.open("GET", firebaseUrl + "/predstave.json");
	request.send();

	
}
//predstava.html

//admin.html
function getAdministrator(){
	let request = new XMLHttpRequest();
	var baseUrl = (window.location).href;
	var id_korisnika = baseUrl.substring(baseUrl.lastIndexOf('.html') +5);
	console.log(id_korisnika);
	if(id_korisnika != ""){
		console.log("sao sam");
		id_korisnika = baseUrl.substring(baseUrl.lastIndexOf('=') + 1);
	}
	console.log("posle promene", id_korisnika);

	request.onreadystatechange = function () {
		if (this.readyState == 4) {
		if (this.status == 200) {

			formaPrijava("myForm", id_korisnika);
			korisnici = JSON.parse(request.responseText);

			for (let id in korisnici){
				if(korisnici[id].aktivan == "true"){
					dodajKorisnika("korisnici", id, korisnici[id]);
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
function dodajKorisnika(tBody, id,  korisnik){
	let korisnik_red = document.createElement("tr");
	korisnik_red.setAttribute("class", "korisnik");

	let korisnicko_ime = document.createElement("td");
	korisnicko_ime.innerText = korisnik.korisnickoIme;
	korisnicko_ime.setAttribute("class", "korisnik2");
	korisnicko_ime.setAttribute("onclick", "window.location.href='korisnik.html?id=" + id + "'");
		
	ime = document.createElement("td");
	ime.innerText = korisnik.ime;

	prezime = document.createElement("td");
	prezime.innerText = korisnik.prezime;

	email = document.createElement("td");
	email.innerText = korisnik.email;

	korisnik_red.append(korisnicko_ime, ime, prezime, email);
  
	document.getElementById(tBody).appendChild(korisnik_red);
}
//admin.html

//korisnik.html
function getKorisnik(){
	let request = new XMLHttpRequest();
	var baseUrl = (window.location).href;
	var id_korisnika = baseUrl.substring(baseUrl.lastIndexOf('=') + 1);

	request.onreadystatechange = function () {
		if (this.readyState == 4) {
		if (this.status == 200) {

			korisnici = JSON.parse(request.responseText);
			korisnik = korisnici[id_korisnika];

			ime_prezime("naziv", korisnik);
			korisnicko_ime("korisnicko_ime", korisnik);
			lozinka("lozinka", korisnik);
			email("email", korisnik);
			ime("ime", korisnik);
			prezime("prezime", korisnik);
			datum_rodjenja("datum_rodjenja", korisnik);
			adresa("adresa", korisnik);
			broj_telefona("broj_telefona", korisnik);
			izmena_korisnika("dugme_izmena", id_korisnika);
			brisanjeKorisnika("dugme_brisanje", id_korisnika);


		} else {
			alert("Greška prilikom učitavanja korisnika.");
		}
		}
	};
	request.open("GET", firebaseUrl + "/korisnici.json");
	request.send();
}
function ime_prezime(tBody, korisnik){
	let imeprez = document.createElement("a");
	imeprez.innerText = korisnik.ime + " " + korisnik.prezime + "\n"; 

	document.getElementById(tBody).appendChild(imeprez);
}
function korisnicko_ime(tBody, korisnik){
	let korisnicko_ime = document.createElement("a");
	korisnicko_ime.innerText = korisnik.korisnickoIme + "\n"; 
	korisnicko_ime.setAttribute("class", "p-opis2");

	document.getElementById(tBody).appendChild(korisnicko_ime);
}
function lozinka(tBody, korisnik){
	let lozinka = document.createElement("a");
	lozinka.innerText = korisnik.lozinka + "\n"; 
	lozinka.setAttribute("class", "p-opis2");

	document.getElementById(tBody).appendChild(lozinka);
}
function email(tBody, korisnik){
	let email = document.createElement("a");
	email.innerText = korisnik.email + "\n"; 
	email.setAttribute("class", "p-opis2");

	document.getElementById(tBody).appendChild(email);
}
function ime(tBody, korisnik){
	let ime = document.createElement("a");
	ime.innerText = korisnik.ime + "\n"; 
	ime.setAttribute("class", "p-opis2");

	document.getElementById(tBody).appendChild(ime);
}
function prezime(tBody, korisnik){
	let prezime = document.createElement("a");
	prezime.innerText = korisnik.prezime + "\n"; 
	prezime.setAttribute("class", "p-opis2");

	document.getElementById(tBody).appendChild(prezime);
}
function datum_rodjenja(tBody, korisnik){
	let datum_rodjenja = document.createElement("a");
	datum_rodjenja.innerText = korisnik.datumRodjenja + "\n"; 
	datum_rodjenja.setAttribute("class", "p-opis2");

	document.getElementById(tBody).appendChild(datum_rodjenja);
}
function adresa(tBody, korisnik){
	let adresa = document.createElement("a");
	adresa.innerText = korisnik.adresa + "\n"; 
	adresa.setAttribute("class", "p-opis2");

	document.getElementById(tBody).appendChild(adresa);
}
function broj_telefona(tBody,korisnik){
	let broj_telefona = document.createElement("a");
	broj_telefona.innerText = korisnik.telefon + "\n"; 
	broj_telefona.setAttribute("class", "p-opis2");

	document.getElementById(tBody).appendChild(broj_telefona);
}
function izmena_korisnika(tBody, id){
	let dugme_izmena = document.createElement("button");
	dugme_izmena.innerText = "Izmenite Podatke o Korisniku"; 
	dugme_izmena.setAttribute("class", "o");
	dugme_izmena.setAttribute("type", "submit");
	dugme_izmena.setAttribute("onclick", "window.location.href='izmena_korisnika.html?id=" + id +"'");
	dugme_izmena.style = "margin-left: 0%!important;";

	document.getElementById(tBody).appendChild(dugme_izmena);
}
function brisanjeKorisnika(tBody, id) {
	let deleteBtn = document.createElement("button");
	deleteBtn.innerText = "Obrisi Korisnika";
	deleteBtn.style = "margin-left: 0%!important; background-color: rgb(59, 10, 10)!important;";
	deleteBtn.setAttribute("class", "o");
	deleteBtn.onclick = obrisiKorisnika;
	deleteBtn.setAttribute("type", "button");
	deleteBtn.setAttribute("data-id", id);

	document.getElementById(tBody).appendChild(deleteBtn);
}
function obrisiKorisnika() {
	let text = "Da li ste sigurni da zelite da obriste korisnika iz baze podatak?\n";
	if (confirm(text) == true) {
		let clickedBtn = this;
		let id = clickedBtn.getAttribute("data-id");

		let request = new XMLHttpRequest();
		request.onreadystatechange = function () {
			if (this.readyState == 4) {
			if (this.status == 200) {
				korisnici = JSON.parse(request.responseText);
				let korisnik = korisnici[id];
				korisnik.aktivan = "false";

				let putRequest = new XMLHttpRequest();
				putRequest.onreadystatechange = function () {
					if (this.readyState == 4) {
					if (this.status == 200) {
						let baseUrl = window.location.href;
						let odseceno = baseUrl.substring(baseUrl.lastIndexOf('/korisnik.html')+1);
						let konacno = baseUrl.replace(odseceno, "");
						window.location.href = konacno + "admin.html" ;
					} else {
						alert("Greška prilikom brisanja korisnika.");
					}
					}
				};
		
				putRequest.open("PUT", firebaseUrl + "/korisnici/" + id + ".json");
				console.log(korisnik);
				putRequest.send(JSON.stringify(korisnik));
			}}
		};

		request.open("GET", firebaseUrl + "/korisnici.json");
		request.send();
	}
}
//korisnik.html

//funkcije za otvaranje/zatvaraje forme za login
function formaPrijava(tBody, id_korisnika){
	let forma_korisnici = document.createElement("form");
	forma_korisnici.setAttribute("class", "form-container");
	if(id_korisnika == ""){
		forma_korisnici.setAttribute("action", "/action_page.php");

		let naslov = document.createElement("h2");
		naslov.innerText = "Prijavi se/Registruj se";
		forma_korisnici.append(naslov);

		let email = document.createElement("label");
		email.setAttribute("for", "email");
		let email_input = document.createElement("input");
		email_input.setAttribute("type", "email");
		email_input.setAttribute("placeholder", "email");
		email_input.setAttribute("id", "email");
		email_input.setAttribute("required", "true");
		forma_korisnici.append(email, email_input);

		let sifra = document.createElement("label");
		sifra.setAttribute("for", "sifra");
		let sifra_input = document.createElement("input");
		sifra_input.setAttribute("type", "text");
		sifra_input.setAttribute("id", "sifra");
		sifra_input.setAttribute("placeholder", "sifra");
		sifra_input.setAttribute("required", "true");
		forma_korisnici.append(sifra, sifra_input);

		let prijava = document.createElement("button");
		prijava.innerText = "Prijavite Se";
		prijava.setAttribute("type", "submit");
		prijava.setAttribute("class", "btn");
		forma_korisnici.append(prijava);

		let editForm = document.getElementById("myForm");
			editForm.addEventListener("submit", function (e) {
			e.preventDefault();

			let email2 = document.querySelector("#email").value.trim();
			let sifra2 = document.querySelector("#sifra").value.trim();

			let request = new XMLHttpRequest();
			request.onreadystatechange = function (e) {
			if (this.readyState == 4) {
				if (this.status == 200) {
					korisnici = JSON.parse(request.responseText);
					let count = 0;
					for (let id in korisnici){
						korisnik = korisnici[id];
						if(email2 == korisnik.email){
							count = count + 1;
							if(sifra2 == korisnik.lozinka){
								if(korisnik.aktivan == "true"){
									let baseUrl = window.location.href;
									window.location.href = baseUrl + "?id=" + id ;
									alert("Uspesno ste se prijavili.");
								}else{
									alert("Vas nalog je neaktivan. LogIn nije moguc.");
								}
								
							}else{
								alert("Sifra nije validna.");
							}
						}
					}
					if(count == 0){
						alert("Ne postoji korisnk sa email-om koji ste uneli.");
					}
				} else {
					alert("Email ili sifra nisu validni.");
				}
			}
			};

			request.open("GET", firebaseUrl + "/korisnici.json");
			request.send();
			});


		let registracija = document.createElement("button");
		registracija.innerText = "Nemate Nalog ? Registujte se!";
		registracija.setAttribute("type", "button");
		registracija.setAttribute("class", "btn registracija");
		registracija.setAttribute("id", tBody);
		registracija.onclick = otvoriRegistraciju;
		forma_korisnici.append(registracija);

		let zatvori = document.createElement("button");
		zatvori.innerText = "Zatvori";
		zatvori.setAttribute("type", "button");
		zatvori.setAttribute("class", "btn cancel");
		zatvori.onclick = closeForm;
		forma_korisnici.append(zatvori);

		
	}else{
		let request = new XMLHttpRequest();
			request.onreadystatechange = function (e) {
			if (this.readyState == 4) {
				if (this.status == 200) {
					korisnici = JSON.parse(request.responseText);
					document.getElementById("prijavi_se_dugme").innerText = "Prijavljeni Korisnik: " +korisnici[id_korisnika].korisnickoIme;
					document.getElementById("prijavi_se_dugme").setAttribute("onclick", "");	
				}
				}
			}

		request.open("GET", firebaseUrl + "/korisnici.json");
		request.send();
		

	}
		document.getElementById(tBody).appendChild(forma_korisnici);
}

function openForm() { //otvara formu za registraciju u formi pop up-a
	document.getElementById("myForm").style.display = "block";
}
function closeForm() { //zatvara formu za registraciju u formi pop up-a
	document.getElementById("myForm").style.display = "none";
}

function prazniKomentari(tBody){
	let forma_komentar = document.createElement("a");
	
	forma_komentar.innerText = "Trenutno nema komentara za ovu predstavu!";
	forma_komentar.setAttribute("class", "p-opis2");

	document.getElementById(tBody).appendChild(forma_komentar);	
}
function ucitajKomentare(tBody,id_komentara, komentar, width){
	let forma_komentar = document.createElement("div");
	forma_komentar.setAttribute("class", "wrapper korisnik");
	forma_komentar.setAttribute("style", "max-width:" + width + "% !important;");

		let username = document.createElement("a");
		username.setAttribute("class", "p-naslov2");
		username.innerText = komentar.korisnickoIme + "\n";
		forma_komentar.append(username);

		let komentar2 = document.createElement("a");
		komentar2.setAttribute("class", "p-opis2");
		komentar2.innerText = komentar.komentar + "\n";
		forma_komentar.append(komentar2);

		let odgovori_na_komentar = document.createElement("button");
		odgovori_na_komentar.setAttribute("class", "btn");
		odgovori_na_komentar.setAttribute("style", "background-color: #9E8D5F!important;width: 100%!important; margin: 3% auto 3% auto!important;");
		odgovori_na_komentar.setAttribute("type", "button");
		odgovori_na_komentar.setAttribute("id", id_komentara);
		odgovori_na_komentar.onclick = odgovoriKomentar;
		odgovori_na_komentar.innerText = "Odgovorite na Komentar";
		forma_komentar.append(odgovori_na_komentar);

		let odgovori_forma = document.createElement("div");
		odgovori_forma.setAttribute("id", "odgovori_forma"+ id_komentara);
		forma_komentar.append(odgovori_forma);

		document.getElementById(tBody).appendChild(forma_komentar);
		if(komentar.odgovori != undefined){
			if(komentar.odgovori.length != 0){
			let naslov = document.createElement("a");
			naslov.setAttribute("class", "p-naslov2");
			naslov.setAttribute("style", "max-width: 60% !important; text-align: left !important;");
			naslov.innerText = "Odgovori na komentar: \n";
			document.getElementById(tBody).appendChild(naslov);

			for (let i in komentar.odgovori){
				odgovor = komentar.odgovori[i];
				let id_odgovora = id_komentara + "&" + i; 
				if(odgovor != null){
					ucitajKomentare(tBody, id_odgovora, odgovor, 40);	
				}
				
			}
		}
		}
}
function odgovoriKomentar(){
	let clickedBtn = this;
	let id = clickedBtn.getAttribute("id");
	document.getElementById("odgovori_forma"+ id).style.display = "block";
	formaKomentara("odgovori_forma"+id);
}

function formaKomentara(tBody){
	var id_komentara = "";
	if(tBody !="forma_komentara"){
		var str = tBody;
		let nesto = str.replace("odgovori_forma", "");
		nesto = nesto.split("&");
		id_komentara = nesto[0];
		console.log(id_komentara);
	}
	
	let forma_komentar = document.createElement("form");
	forma_komentar.setAttribute("class", "form-container");
	forma_komentar.setAttribute("style", "max-width: 80%;");

	let komentar = document.createElement("label");
	komentar.setAttribute("for", "email");
	let komentar_input = document.createElement("input");
	komentar_input.setAttribute("type", "text");
	komentar_input.setAttribute("placeholder", "add a comment..");
	komentar_input.setAttribute("id", "komentar"+id_komentara);
	komentar_input.setAttribute("required", "true");
	forma_komentar.append(komentar, komentar_input);

	let username = document.createElement("label");
	username.setAttribute("for", "username");
	let username_input = document.createElement("input");
	username_input.setAttribute("type", "text");
	username_input.setAttribute("placeholder", "unesite username");
	username_input.setAttribute("id", "username"+id_komentara);
	username_input.setAttribute("required", "true");
	forma_komentar.append(username, username_input);

	let dodaj_komentar = document.createElement("button");
	dodaj_komentar.setAttribute("class", "btn sacuvaj");
	dodaj_komentar.setAttribute("type", "submit");
	if ( tBody == "forma_komentara"){
		dodaj_komentar.innerText = "Dodajte Komentar";
	}else{
		dodaj_komentar.innerText = "Odgovorite na Komentar";
	}
	forma_komentar.append(dodaj_komentar);

		if ( tBody == "forma_komentara"){
			var editForm = document.getElementById("forma_komentara");
		}else{
			var editForm = document.getElementById(tBody);
		}
		editForm.addEventListener("submit", function (e) {
			console.log("kliknuli ste dugme");
		e.preventDefault();
		
		var novi_komentar = {};
		var komentar2, username2;
		if ( tBody == "forma_komentara"){
			komentar2 = document.querySelector("#komentar").value.trim();
			username2 = document.querySelector("#username").value.trim();
		}else{
			komentar2 = document.querySelector("#komentar"+id_komentara).value.trim();
			username2 = document.querySelector("#username"+id_komentara).value.trim();
		}
		
		console.log(komentar2, username2);

		if (komentar2 != "") {
			novi_komentar.komentar= komentar2;
		}
		if (username2 != "") {
			novi_komentar.korisnickoIme = username2;
		}

		console.log("ovo je komentar koji se unosi u bazu", novi_komentar);
		let request = new XMLHttpRequest();
		request.onreadystatechange = function (e) {
		if (this.readyState == 4) {
			if (this.status == 200) {
				var baseUrl = (window.location).href;
				var id_korisnika = baseUrl.substring(baseUrl.lastIndexOf('=') + 1);
				var id = id_korisnika.split("$");
				
				komentari = JSON.parse(request.responseText);
				let putRequest = new XMLHttpRequest();

				putRequest.onreadystatechange = function (e) {
				if (this.readyState == 4) {
					if (this.status == 200) {
						getOpisPredstave();
					} else {
					alert("Greška prilikom izmene korisnika.");
					}
				}
				};

				if ( tBody == "forma_komentara"){
					console.log("trenutno je forma za dodavanje kom");
					putRequest.open("POST", firebaseUrl + "/komentari/" + id[2] + ".json");
					putRequest.send(JSON.stringify(novi_komentar));
				}else{
					id_odgovori = id_komentara.replace("&", "/");
					console.log(firebaseUrl + "/komentari/" + id[2] + "/" + id_odgovori+ "/odgovori" + ".json");
					putRequest.open("POST", firebaseUrl + "/komentari/" + id[2] + "/" + id_odgovori + "/odgovori"+ ".json");
					putRequest.send(JSON.stringify(novi_komentar));
				}
				
				}
			}}

		request.open("GET", firebaseUrl + "/komentari.json");
		request.send();
		});

	document.getElementById(tBody).appendChild(forma_komentar);
	let novi_red = document.createElement("br");
	document.getElementById(tBody).appendChild(novi_red);
}

function otvoriRegistraciju(){
	let clickedBtn = this;
	let id = clickedBtn.getAttribute("id");
	obrisi(id);
	formaRegistracija(id);
}
function formaRegistracija(tBody){

	let forma_korisnici = document.createElement("form");
	forma_korisnici.setAttribute("class", "form-container");
	forma_korisnici.setAttribute("action", "/action_page.php");

	let novi_korisnik;

	let naslov = document.createElement("h2");
	naslov.innerText = "Registruj se";
	forma_korisnici.append(naslov);

	let korisnicko_ime = document.createElement("label");
	korisnicko_ime.innerText = "Korisnicko Ime";
	let korisnicko_ime1 = document.createElement("input");
	korisnicko_ime1.type = "text";
	korisnicko_ime1.setAttribute("id", "korisnicko_ime");
	korisnicko_ime1.setAttribute("required", "true");
	forma_korisnici.append(korisnicko_ime, korisnicko_ime1);

	let lozinka = document.createElement("label");
	lozinka.innerText = "Loznika";
	let lozinka1 = document.createElement("input");
	lozinka1.type = "text";
	lozinka1.setAttribute("id", "lozinka");
	lozinka1.setAttribute("required", "true");
	forma_korisnici.append(lozinka, lozinka1);

	let email = document.createElement("label");
	email.innerText = "Email";
	let email1 = document.createElement("input");
	email1.type = "email";
	email1.setAttribute("id", "email");
	email1.setAttribute("required", "true");
	forma_korisnici.append(email, email1);

	let ime = document.createElement("label");
	ime.innerText = "Ime";
	let ime1 = document.createElement("input");
	ime1.type = "text";
	ime1.setAttribute("id", "ime");
	ime1.setAttribute("required", "true");
	forma_korisnici.append(ime, ime1);

	let prezime = document.createElement("label");
	prezime.innerText = "Prezime";
	let prezime1 = document.createElement("input");
	prezime1.type = "text";
	prezime1.setAttribute("id", "prezime");
	prezime1.setAttribute("required", "true");
	forma_korisnici.append(prezime, prezime1);

	let datum_rodjenja = document.createElement("label");
	datum_rodjenja.innerText = "Datum Rodjenja";
	let datum_rodjenja1 = document.createElement("input");
	datum_rodjenja1.type = "date";
	datum_rodjenja1.setAttribute("id", "datum_rodjenja");
	datum_rodjenja1.setAttribute("required", "true");
	forma_korisnici.append(datum_rodjenja, datum_rodjenja1);

	let adresa = document.createElement("label");
	adresa.innerText = "Adresa";
	let adresa1 = document.createElement("input");
	adresa1.type = "text";
	adresa1.setAttribute("id", "adresa");
	adresa1.setAttribute("required", "true");
	forma_korisnici.append(adresa, adresa1);

	let broj_telefona = document.createElement("label");
	broj_telefona.innerText = "Broj Telefona";
	let broj_telefona1 = document.createElement("input");
	broj_telefona1.type = "tel";
	broj_telefona1.setAttribute("id", "broj_telefona");
	broj_telefona1.setAttribute("required", "true");
	forma_korisnici.append(broj_telefona, broj_telefona1);

	let dugme_sacuvaj = document.createElement("button");
	dugme_sacuvaj.innerText = "Registrujte se!"; 
	dugme_sacuvaj.setAttribute("class", "btn sacuvaj");
	dugme_sacuvaj.setAttribute("type", "submit");
	
	forma_korisnici.append(dugme_sacuvaj);
		
		let editForm = document.getElementById(tBody);
			editForm.addEventListener("submit", function (e) {
			e.preventDefault();

			let korisnicko_ime2 = document.querySelector("#korisnicko_ime").value.trim();
			let lozinka2 = document.querySelector("#lozinka").value.trim();
			let email2 = document.querySelector("#email").value;
			let ime2 = document.querySelector("#ime").value.trim();
			let prezime2 = document.querySelector("#prezime").value.trim();
			let datum_rodjenja2 = document.querySelector("#datum_rodjenja").value;
			let adresa2 = document.querySelector("#adresa").value.trim();
			let broj_telefona2 = document.querySelector("#broj_telefona").value;

			
			let request = new XMLHttpRequest();
			request.onreadystatechange = function (e) {
			if (this.readyState == 4) {
				if (this.status == 200) {
					korisnici = JSON.parse(request.responseText);
					let count = 0;
					for (let i in korisnici){
						novi_korisnik = korisnici[i];
					}

					if (korisnicko_ime2 != "") {
						novi_korisnik.korisnickoIme = korisnicko_ime2;
					}
					if (lozinka2 != "") {
						var numbers = /[0-9]/g;
						var lowerCaseLetters = /[a-z]/g;
						if(lozinka2.length > 8 && lozinka2.match(numbers) && lozinka2.match(lowerCaseLetters)){
							novi_korisnik.lozinka = lozinka2;
						}else{
							alert("Lozinka mora da sadrzi minimum 8 karaktera, brojeve i slova!");
						}
					}
					if (email2 != "") {
						let count = 0;
						for (let i in korisnici){
							if(korisnici[i].email == email2){
								count+=1;
							}
						}
						if(count==0){
							novi_korisnik.email = email2;
						}

					}
					if (ime2 != "") {
						novi_korisnik.ime = ime2;
					}
					if (prezime2 != "") {
						novi_korisnik.prezime = prezime2;
					}
					if (datum_rodjenja2 != "") {
						novi_korisnik.datumRodjenja = datum_rodjenja2;
					}
					if (adresa2 != "") {
						novi_korisnik.adresa = adresa2;
					}
					if (broj_telefona2 != ""  &&  isNaN(broj_telefona2)== false) {
						let duzina = broj_telefona2.length;
						console.log(duzina);
						if(duzina > 8  && duzina < 11){
							novi_korisnik.telefon = broj_telefona2;
						}else{
							alert("Broj koji ste uneli nije validan!");
							}
					}else{
						if(broj_telefona2 != ""){
							alert("Broj telefona ne moze da sadrzi slova!");	
						}
					}

					novi_korisnik.aktivan = "true";

				}
				}
				};

				request.open("GET", firebaseUrl + "/korisnici.json");
				request.send();
			

			let putRequest = new XMLHttpRequest();
			putRequest.onreadystatechange = function (e) {
			if (this.readyState == 4) {
				if (this.status == 200) {
					let baseUrl = window.location.href;
					window.location.href = baseUrl;
					alert("Uspesno ste se registrovali. Izvrsite prijavu!");

				}
			}
			};

			putRequest.open("POST", firebaseUrl + "/korisnici.json");
			putRequest.send(JSON.stringify(novi_korisnik));
			});

	let dugme_nazad = document.createElement("button");
	dugme_nazad.innerText = "Zatvori"; 
	dugme_nazad.setAttribute("class", "btn cancel");
	dugme_nazad.setAttribute("type", "button");
	dugme_nazad.onclick = closeForm;
	forma_korisnici.append(dugme_nazad);

	document.getElementById(tBody).appendChild(forma_korisnici);
}

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}