import React, {useCallback, useState, useMemo} from 'react';
import { defined } from 'cesium';
import PropTypes from 'prop-types';
import {Button, Tooltip, Layout} from 'antd';
import {QuestionOutlined} from '@ant-design/icons';
import Window from '../../../window/base/Window/Window';
import './AboutButton.css';
const {Content, Header, Footer} = Layout;

const defaultContent = 'Content about your application goes here...';

/**
 * About Button to show the "About" window.
 * This window will provide information about
 * the React-CesiumExt library. 
 * Please, use it in your application to let the people to know about React-CesiumExt
 * @visibleName About Button
 */
const AboutButton = ({
    content = defaultContent,
    icon= <QuestionOutlined/>,
    shape="circle",
    windowProps, 
    children,
    tooltipProps = null,
    showTooltip = true,
    ...otherProps
}) => {

    const [visibleWnd, setVisibleWnd] = useState(false);

    /**
     * Handler to close the "About" Window once the OK button
     * on this window is clicked
     */
    const onCloseWindow = useCallback(() => {
        setVisibleWnd(false);
    }, []);

     /**
     * Handler to show the About Window once the button is Clicked
     */
     const onShowWindow = useCallback(() => {
        setVisibleWnd(true);
    }, []);

    const aboutWnd = useMemo(() => {
        return (
            <Window
                title= {defined(children) ? children: 'About'}	
                collapsible
                onClose={onCloseWindow}
                visible={visibleWnd}
                {...windowProps}
            >
                <Layout className="rcesiumext-about-wnd">
                    <Content>
                        <h1>React-CesiumExt 0.1</h1>
                        <h2>Components for Building 3D Web Map Applications</h2>
                        <ul>
                            <li>
                                <label className="rcesiumext-about-wnd-link"><a rel="noreferrer" href='https://mapuiexts.github.io/react-cesiumext.github.io/en/v0.1/apidoc/' target='_blank' >API Docs</a></label>         
                            </li>
                            <li>
                                <label className="rcesiumext-about-wnd-link "><a rel="noreferrer" href='https://github.com/mapuiexts/React-CesiumExt' target='_blank' >Source Code</a></label>
                            </li>
                        </ul>
                    </Content>
                    <Content>
                        {content}
                    </Content>
                </Layout>
            </Window>
        );
    }, [content, visibleWnd, windowProps, onCloseWindow, children]);

    return (
        <React.Fragment>
            { showTooltip ?
                <Tooltip title={defined(children) ? children: 'About'} placement="top" mouseLeaveDelay={0.05} {...tooltipProps}>
                    <Button icon={icon} shape={shape} onClick={onShowWindow} {...otherProps}>{children}</Button>
                </Tooltip>
                :
                <Button icon={icon} shape={shape} onClick={onShowWindow} {...otherProps}></Button>
            }
            {visibleWnd && aboutWnd}
        </React.Fragment>
    );
    
};

AboutButton.propTypes = {

     /**
     * A CSS Style to render the style for the About Window
     */
    wndStyle:PropTypes.object,

     /**
     * The child node for the About Button
     */
    children: PropTypes.node,

    /**
     * The custom content for the About Button
     */
    content: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.node
    ])
};

export default AboutButton;