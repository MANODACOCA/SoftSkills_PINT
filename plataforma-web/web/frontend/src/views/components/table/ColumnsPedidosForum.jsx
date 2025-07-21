export const columnsPedidosForum = [
    { label: 'Nº', key: 'id_pedidos_novos_foruns'},
    { label: 'Nome utilizador', render: (item) => {return item.id_formando_formando.id_formando_utilizador.nome_util}},
    { label: 'Nome forum', key: 'novo_forum'},
];