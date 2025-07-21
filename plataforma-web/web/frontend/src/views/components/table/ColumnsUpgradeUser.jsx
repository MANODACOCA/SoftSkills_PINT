export const ColumnsUpgradeUser = [
    { label: 'Nº', key: 'id_pedidos_upgrade_cargo'},
    { label: 'Nome utilizador', render: (item) => {return item.id_formando_formando.id_formando_utilizador.nome_util}},
    { label: 'Nome utilizador', render: (item) => {return item.id_formando_formando.id_formando_utilizador.email}},
];