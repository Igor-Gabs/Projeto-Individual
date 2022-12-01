create database karasu;

use karasu;

create table votos(
idvotos int primary key auto_increment,
qtdVotos int,
nome varchar (45)
);

create table usuario(
idusuario int primary key auto_increment,
email varchar (45),
nome varchar (45),
sobrenome varchar(45),
senha varchar(45),
fkvotos int,
foreign key (fkvotos) references votos(idvotos)
);



create table avaliacao (
idavaliacao int primary key auto_increment,
comentario varchar(255),
fkusuario int,
foreign key(fkusuario) references usuario(idusuario)
);


insert into votos values
(null, 0,'culinaria'),
(null, 0,'religia	o'),
(null, 0,'esportes'),
(null, 0,'periodo Edo'), 	
(null, 0,'animes/manga'); 


select * from usuario