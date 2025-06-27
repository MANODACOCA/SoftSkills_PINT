import React, { useEffect, useState } from 'react';


const WorkCard = ({ trabalho }) => {
    return (
        <Card className="flex items-center justify-between p-6 mb-4 bg-white shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-200">
            <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                    <FileText className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                    <h3 className="font-semibold text-gray-900">{index+1}</h3>
                    <p className="text-gray-600 text-sm">{trabalho.nome_tr}</p>
                </div>
            </div>

            <Button
                onClick={onSubmit}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
            >
                Entregar
            </Button>
        </Card>
    );
};

export default WorkCard;