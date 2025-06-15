export const columnsQueixas = [
  { label: 'Nº', key: 'id_denuncia'},
  { label: 'Nome Utilizador', render: (item) => { return item.id_utilizador_utilizador.nome_utilizador; } },
  { label: 'Categoria/Area/Topico', render: (item) => {
      let tipo; 
      if(item.id_post != null) tipo = item.post_info; 
      else if(item.id_comentario != null) tipo = item.comentario_info.post;
      const cat_area_top = [];
      const cat = tipo.categoria_area_topico.categoria;
      const area = tipo.categoria_area_topico.area;
      const top = tipo.categoria_area_topico.topico;
      cat_area_top.push(cat);
      cat_area_top.push(area);
      cat_area_top.push(top);
      return cat_area_top.join('/ ');
    } 
  },
  { label: 'Comentário/Post', render: (item) => {
      if(item.id_post != null) return 'Post'; 
      else if(item.id_comentario != null) return 'Comentário';
    } 
  },
  { label: 'Tipo de denuncia', render: (item) => {return item.id_tipo_denuncia_tipo_denuncium.tipo_denuncia; } },  
];
