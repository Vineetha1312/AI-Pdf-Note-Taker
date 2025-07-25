"use client" // This ensures the component is treated as a client-side component

import React, { useEffect } from 'react';
import WorkspaceHeader from '../_components/WorkspaceHeader';
import PdfViewer from '../_components/PdfViewer';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useParams } from 'next/navigation';
import TextEditor from '../_components/TextEditor';

function Workspace() {
    const { fileId } = useParams();
    const fileInfo = useQuery(api.fileStorage.GetFileRecord, { fileId:fileId });

    useEffect(() => {
        console.log(fileInfo);
    }, [fileInfo]);

    return (
        <div>
            <WorkspaceHeader fileName={fileInfo?.fileName}/>
            <div className="grid grid-cols-2 gap-5">
                <div>
                    <TextEditor fileId={fileId}/>
                </div>
                <div>
                    {/* PDF viewer */}
                    <PdfViewer fileUrl={fileInfo?.fileUrl}/>
                </div>
            </div>
        </div>
    );
}

export default Workspace;
